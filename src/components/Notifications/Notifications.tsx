import React from 'react';
import Toast from 'react-bootstrap/Toast';
import styles from './Notifications.module.css';

type NotificationsProps = {
	hideMsg:Function,
	msgData:any
}

function Notifications({ hideMsg, msgData }:NotificationsProps) {
	const msg = msgData.msgParams;
	const header = (
		<Toast.Header className={styles.notificationHeader}>
			<span className="mr-auto">{ msg.title }</span>
		</Toast.Header>
	);
	let body = null;
	if (msg.fields && msg.fields.length) {
		body = (
			<Toast.Body className={styles.notificationBody}>
				<ul className={styles.notificationList}>
					{
						msg.fields.map((field:JSX.Element, i:number) => (
							<li key={i}>{ field }</li>
						))
					}
				</ul>
			</Toast.Body>
		);
	}
	return (
			<Toast
				show={msgData.showMsg}
				onClose={() => hideMsg()}
				delay={5000}
				autohide
				className={styles.notificationToast}>
					{ header }
					{ body }
			</Toast>
	);
}

export default Notifications;