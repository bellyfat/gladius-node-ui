import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';

import GettingStarted from './signup/gettingStarted';
import GetSecure from './signup/getSecure';
import FunnelSteps from './signup/funnelSteps';
import PoolSelection from './signup/poolSelection';
import LockedRoute from './lockedRoute';
import MastheadContentSplit from './mastheadContentSplit';
import Masthead from './masthead';
import { signupSelectors } from '../state/ducks/signup';

const { getSignupCurrentIndex, getSignupStepsPath } = signupSelectors;

export function BaseSignup({
  currentOnboardingStepIndex,
  onboardingStepIndexByPath
}) {
  return (
    <MastheadContentSplit
      masthead={
        <Masthead>
          <div className="row justify-content-between align-items-center">
            <div className="col">
              <FunnelSteps />
            </div>
          </div>
        </Masthead>
      }
    >
      <div className="container pb-5">
        <div className="row justify-content-center">
          <Switch>
            <Route exact path="/signup" render={() => <Redirect to="/signup/getting-started" />} />
            <LockedRoute
              path="/signup/getting-started"
              redirectTo="/signup/get-secure"
              component={GettingStarted}
              isAllowed={({ path }) => (
                currentOnboardingStepIndex === onboardingStepIndexByPath[path]
              )}
            />
            <LockedRoute
              path="/signup/get-secure"
              redirectTo="/signup/choose-pool"
              component={GetSecure}
              isAllowed={({ path }) => (
                currentOnboardingStepIndex === onboardingStepIndexByPath[path]
              )}
            />
            <LockedRoute
              path="/signup/choose-pool"
              redirectTo="/signup"
              component={PoolSelection}
              isAllowed={({ path }) => (
                currentOnboardingStepIndex === onboardingStepIndexByPath[path]
              )}
            />
          </Switch>
        </div>
      </div>
    </MastheadContentSplit>
  );
}

BaseSignup.propTypes = {
  currentOnboardingStepIndex: PropTypes.number.isRequired,
  onboardingStepIndexByPath: PropTypes.objectOf(PropTypes.number).isRequired,
};

function mapStateToProps(state) {
  return {
    currentOnboardingStepIndex: getSignupCurrentIndex(state),
    onboardingStepIndexByPath: getSignupStepsPath(state),
  };
}

export default connect(mapStateToProps)(BaseSignup);
