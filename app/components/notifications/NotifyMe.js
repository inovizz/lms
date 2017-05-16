import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import Notifications from 'react-notification-system-redux';

class NotifyMe extends React.Component {
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props.message) !== JSON.stringify(nextProps.message)) {
            const { type } = nextProps.message.message;
            switch (type) {
                case 'success':
                    this.dispatchNotification(Notifications.success, 250, nextProps);
                case 'error':
                    this.dispatchNotification(Notifications.error, 250, nextProps);
                default: break
            }
        }
    }
    dispatchNotification(fn, timeout, nextProps) {
        const { title, text } = nextProps.message.message;
        const notificationOpts = {
            // uid: 'once-please', // you can specify your own uid if required 
            title: title,
            message: text,
            position: 'br',
            autoDismiss: 0,
            action: {
                label: 'Close!!',
                // callback: () => alert('clicked!')
            }
        };
        setTimeout(() => {
            this.context.store.dispatch(fn(notificationOpts));
        }, timeout);
    }

    render() {
        const { notifications } = this.props;

        return (
            <div>
                <Notifications notifications={notifications} />
            </div>
        );
    }
}

// export default NotifyMe;

NotifyMe.contextTypes = {
    store: PropTypes.object
};

NotifyMe.propTypes = {
    notifications: PropTypes.array
};

export default connect(
    state => ({ notifications: state.notifications })
)(NotifyMe);