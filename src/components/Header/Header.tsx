import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { GITHUB_PAGE } from '../../consts/urls';
import './Header.css'

interface HeaderProps {
	openSettingsModal: () => void;
	openCopyrightModal: () => void;
}

function Header({
	openSettingsModal,
	openCopyrightModal
}: HeaderProps) {
	return (
		<Navbar variant="light">
			<Navbar.Brand>
				<img
					src={logo}
					className="logo d-inline-block align-top"
					alt="RPG Poznań Logo "
				/>
			</Navbar.Brand>
			<Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
			<FontAwesomeIcon
				onClick={openCopyrightModal}
				className="pointer icon-settings"
				icon={faCopyright}
			/>
			<a href={GITHUB_PAGE}>
				<FontAwesomeIcon
					className="pointer icon-settings"
					icon={faGithub}
				/>
			</a>
			<FontAwesomeIcon
				onClick={openSettingsModal}
				className="pointer icon-settings"
				icon={faCog}
			/>
		</Navbar>
	);
}

export default Header;
