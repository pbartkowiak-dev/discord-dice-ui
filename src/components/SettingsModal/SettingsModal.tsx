import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UserSettingsForm from './UserSettingsForm';
import localStorageUserSettingsManager from '../../utils/localStorageUserSettingsManager';
import getRandomUserColor from '../../utils/getRandomUserColor';
import './SettingsModal.css';
import { version } from '../../../package.json';

type SettingsModalProps = {
	showSettingsModal: boolean,
	closeSettingsModal: Function,
	saveUserSettings: Function,
	userSettings: any
}

function SettingsModal({
	showSettingsModal,
	closeSettingsModal,
	saveUserSettings,
	userSettings
}: SettingsModalProps
) {
	const handleClose = () => {
		closeSettingsModal();
	};

	const handleSubmit = (values:any) => {
		const valuesWithColor = {
			...values,
			userColor: getRandomUserColor()
		};
		saveUserSettings(valuesWithColor);
		localStorageUserSettingsManager.save(valuesWithColor);
		closeSettingsModal();
	};

	return (
		<>
			<Modal show={showSettingsModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Settings<p className="version-subtitle">v. {version}</p></Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<UserSettingsForm
					onSubmit={values => handleSubmit(values)}
					initialValues={userSettings}
				/>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" type="submit" form="user-settings-form">
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default SettingsModal;