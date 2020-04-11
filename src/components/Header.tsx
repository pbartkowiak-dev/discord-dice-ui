import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../img/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './Header.css'

type HeaderProps = {
	openSettingsModal: Function
}

function Header({ openSettingsModal }: HeaderProps) {
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
				onClick={() => openSettingsModal() }
				className="pointer icon-settings"
				icon={faCog}
			/>
		</Navbar>
	);
}

export default Header;