import React from 'react';
import Toast from 'react-bootstrap/Toast';
import styles from './Notifications.module.css';

function getMsgFromParams(msgParams:any) {
	let body:any = '';
	let modifier:any = '';

	if (msgParams && msgParams.fields && msgParams.fields.length) {
		body = msgParams.fields.map((field:string, i:number) => {
			return (
				<li key={i}>{field.replace(/`/g, '')}</li>
			);
		});
		body = <ul className={styles.notificationList}>{ body }</ul>;
	}

	if (msgParams.modifier) {
		modifier = <ul className={styles.notificationModifier}><li>{msgParams.modifier}</li></ul>;
	}

	return {
		title: msgParams.title,
		modifier,
		body
	};
}

type NotificationsProps = {
	hideMsg:Function,
	msgData:any
}

function Notifications({ hideMsg, msgData }:NotificationsProps) {
	const msg = getMsgFromParams(msgData.msgParams);
	return (
			<Toast
				show={msgData.showMsg}
				onClose={() => hideMsg()}
				delay={5000}
				autohide
				className={styles.notificationToast}>
				<Toast.Header>
					<strong className="mr-auto">{ msg.title || '' }</strong>
				</Toast.Header>
				{ (msg.modifier || msg.body) &&
					<Toast.Body>
					{ msg.modifier && msg.modifier }
					{ msg.body && msg.body }
					</Toast.Body>
				}
			</Toast>
	);
}

export default Notifications;