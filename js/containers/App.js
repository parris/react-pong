import React from 'react';
import {Provider} from 'react-redux';
import configureStore from '../store/configureStore';
import Pong from '../components/Pong';
import {renderDevTools} from '../utils/devTools';

const store = configureStore();

export default React.createClass({
  render() {
    return (
      <div>

        {/* <Game /> is your app entry point */}
        <Provider store={store}>
          <Pong />
        </Provider>

        {/* only renders when running in DEV mode */
          renderDevTools(store)
        }
      </div>
    );
  }
});
