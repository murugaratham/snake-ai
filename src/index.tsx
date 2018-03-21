import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { IStoreState } from './types/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Manager from './AI/manager';
import './styles/App.css';
import configureStore, { IConfiguredStore } from './store/configureStore';
import initialState from './reducers/initialState';
import * as Fields from './containers';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import NavBar from './components/NavBar/Index';
import db from './AI/db';
import Modal from 'react-modal';
import ReactModal from 'react-modal';

const configuredStore: IConfiguredStore = configureStore();
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component<{}, IStoreState> {  
  manager: Manager;
  unsubscribe: () => void;
  constructor(props: any) {
    super(props);
    this.state = initialState;
    this.manager = new Manager(configuredStore.store.getState());
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.stop = this.stop.bind(this);
    this.unsubscribe = configuredStore.store.subscribe(this.changeSubscription(this.manager));
    this.closeModal = this.closeModal.bind(this); 
    this.hydrateSnakes = this.hydrateSnakes.bind(this);
    db.table('snakes').count().then(count => {
      if (count > 0) {
        this.setState({ isPortalActive: true });
      } 
    });
  }
  changeSubscription = (manager: Manager) => () => {
    const newState = configuredStore.store.getState();
    manager.updateSettings(newState);
  }
  start() {
    this.setState({ running: true });
    this.manager.start();
  }

  stop() {
    this.setState({
      running: false
    });
    this.manager.stop();
  }

  pause() {
    this.setState({
      paused: true
    });
    this.manager.pause();
  }

  resume() {
    this.setState({
      paused: false
    });
    this.manager.resume();
  }

  toggleSideBar(): any {
    document.querySelector('#wrapper')!.classList.toggle('toggled');
  }

  closeModal() {
    this.setState({ isPortalActive: false });
  }

  hydrateSnakes() {
    this.setState({ isPortalActive: false });
    this.manager.updateSettings(configuredStore.store.getState(), true);
  }

  render() {
    var canvases = [];
    const populationSize = this.state.populationReducer.value;
    const displaySize = this.state.displaySizeReducer.value;
    for (var i = 0; i < populationSize; i++) {
      canvases.push(i);
    }   
    ReactModal.setAppElement('body');
    return (
      <div>
        <NavBar toggleSideBar={this.toggleSideBar} />
        <div className="App" id="wrapper">
          <div id="sidebar-wrapper">
            <div className="control-menu">
              {this.state.running && !this.state.paused ? (
                <div>
                  <div className="btn btn-orange" onClick={this.pause}>
                    Pause Evolution
                    </div>
                </div> ) : ('')}
              {this.state.running && this.state.paused ? (
                <div>
                  <div className="btn btn-success" onClick={this.resume}>
                    Resume Evolution
                    </div>
                  <div className="btn btn-danger" onClick={this.stop}>
                    Stop Evolution
                    </div>
                </div>
              ) : ('')}
              {!this.state.running ? (
                <div className="btn btn-success" onClick={this.start}>
                  Start Evolution
                  </div>
              ) : ('')}
              <Fields.PopulationField />
              <Fields.ElitismPercentField />
              <Fields.EatFoodScoreField />
              <Fields.MoveTowardsFoodScoreField />
              <Fields.MoveAwayFoodScoreField />
              <Fields.SnakeStartingLengthField />
              <Fields.GridResolutionField />
              <Fields.DisplaySizeField />
              <Fields.BorderWallSwitch />
              <Fields.HitSelfSwitch />
              <Fields.GrowWhenEatingSwitch />
              <Fields.HighSpeedSwitch />
            </div>
          </div>
          <div className="description">
            <div id="page-content-wrapper">
              <div className="container-fluid">
                <h3 style={{ marginBottom: 10, marginTop: 0 }}>
                  {this.state.running ? (
                    <span>
                      Generation <span id="gen" />{''}
                    </span>
                  ) : (<span>Designing AI: Solving Snake with Evolution</span>)}
                </h3>
                <div id="workspace">
                  {canvases.map(j => {
                    return (
                      <div className="grid-item" key={j}>
                        <canvas
                          id={'snake-canvas-' + j}
                          width={displaySize + 'px'}
                          height={displaySize + 'px'}
                        />
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div>
                  <h3 style={{ marginBottom: 10 }}>Performance by Generation</h3>
                  <div id="graph">{/* graph will load here */}</div>
                  <div className="row">
                    <svg className="draw" width="400px" height="400px" />
                  </div>
                  <p>
                    This graph shows a dot for every individual neural net's
                    performance. Each new generation will appear at to the right.
                    </p>
                  <p>
                    <small>
                      <strong>Be patient.</strong> Sometimes, advantageous random
                      mutations happen quickly, sometimes those mutations prove it's
                      better to play it safe, and sometimes they never seem to
                      happen...
                      </small>
                  </p>
                  <small>
                    <i>
                      <strong>
                        Warning: Some browsers slow down the loops being used to train
                        the AI if this tab is in the background. Funky things may
                        happen.
                        </strong>
                    </i>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={this.state.isPortalActive}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        > 
          <div>Seems like you have evolved some snakes before, do you want to load them?</div>
          <button onClick={this.closeModal}>No</button>
          <button onClick={this.hydrateSnakes}>Yes</button>
        </Modal>
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={configuredStore.store}>
    <PersistGate persistor={configuredStore.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
