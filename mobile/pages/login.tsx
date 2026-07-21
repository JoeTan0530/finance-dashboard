import React, { useState, useRef } from 'react';
import { View, Text } from 'react-native';
import standardStyles from '../assets/styles/standardStyles.js';

const Login: React.FC = () => {
	const [loginInputData, setLoginInputData] = useState<any>({});
	const [errMsg, setErrMsg] = useState<any>({});
	const passwordInput = useRef(null);

	const updateFormInput = (text: string, id: string) => {
		setLoginInputData((prevData) => ({
			...prevData,
			[id]: text,
		}));
	};

	const triggerLogin = () => {
		setErrMsg({});
		loginUser(loginInputData, loginCallback, setErrMsg);
	};

	const loginCallback = () => {
		Alert.alert('Login', 'Login Successful...');
	};

	return (
		<View style={[standardStyles.pageContentContainer, standardStyles.loginPageContainer]}>
			<Text>
				Testing use only
				testihojsdif

			</Text>
		</View>
	);
}

export default Login;