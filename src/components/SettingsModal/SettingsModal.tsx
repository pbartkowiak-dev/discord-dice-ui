import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import UserSettingsForm from './UserSettingsForm';
import localStorageUserSettingsManager from '../../utils/localStorageUserSettingsManager';
import './SettingsModal.css';
import { version } from '../../../package.json';

type SettingsModalProps = {
	showModal: boolean,
	closeSettingsModal: Function,
	saveUserSettings: Function,
	userSettings: any
}

function SettingsModal({
	showModal,
	closeSettingsModal,
	saveUserSettings,
	userSettings
}: SettingsModalProps
) {
	const handleClose = () => {
		closeSettingsModal();
	};

	const handleSubmit = (values:any) => {
		saveUserSettings(values);
		localStorageUserSettingsManager.save(values);
		closeSettingsModal();
	};

	return (
		<>
			<Modal show={showModal} onHide={handleClose}>
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
					<Button
						variant="success"
						type="submit"
						form="user-settings-form">
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default SettingsModal;