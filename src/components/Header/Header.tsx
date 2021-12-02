import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../img/logo.png';
import logoSmall from '../../img/logo192.png';
import TooltipWrapper from '../InfoTooltip/TooltipWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faCog, faExclamation, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { GITHUB_PAGE } from '../../consts/urls';
import './Header.css'
import { Badge } from "react-bootstrap";

interface HeaderProps {
	userSettings: any;
	openSettingsModal: () => void;
	openCopyrightModal: () => void;
}

const DangerBadge = () => {
	return (
		<Badge pill variant="danger" className="icon-danger">
			<FontAwesomeIcon icon={faExclamation} />
		</Badge>
	);
};

function Header({
	userSettings,
	openSettingsModal,
	openCopyrightModal
}: HeaderProps) {
	const { username, hookUrl } = userSettings;
	const showMissingDataWarning = !username || !hookUrl;

	return (
		<Navbar variant="light">
			<Navbar.Brand>
				<img
					src={logo}
					className="logo align-top"
					alt="RPG Poznań Logo"
				/>
				<img
					src={logoSmall}
					className="logo-small align-top"
					alt="RPG Poznań Logo"
				/>
			</Navbar.Brand>
			<Navbar.Collapse className="justify-content-end"/>
			<TooltipWrapper content="View Copyright Info" placement="left">
				<FontAwesomeIcon
					onClick={openCopyrightModal}
					className="pointer icon-settings"
					icon={faCopyright}
				/>
			</TooltipWrapper>
			<a href={GITHUB_PAGE}>
				<TooltipWrapper content="Go to Github Repo" placement="left">
					<FontAwesomeIcon
						className="pointer icon-settings"
						icon={faGithub}
					/>
				</TooltipWrapper>
			</a>
			<div className="icon-container">
				<TooltipWrapper content={(
					<>
						<div>Open Settings</div>
						{!username && <div className="settings-text-danger"><FontAwesomeIcon icon={faExclamationCircle} /> Username is missing</div>}
						{!hookUrl && <div className="settings-text-danger"><FontAwesomeIcon icon={faExclamationCircle} /> Discord's hook url is missing</div>}
					</>
				)} placement="left">
					<FontAwesomeIcon
						onClick={openSettingsModal}
						className="pointer icon-settings"
						icon={faCog}
					/>
				</TooltipWrapper>
				{ showMissingDataWarning && <DangerBadge/> }
			</div>
		</Navbar>
	);
}

export default Header;
