import React, { useLayoutEffect, useState } from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { Button, Input, Text } from "react-native-elements";
import {StatusBar } from 'expo-status-bar';
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Login'
        })
    }, [navigation])

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then(authUser => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || 
                "https://photo.png"
            })
        }).catch(error => alert(error.message));
    };

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>
            <View style={StyleSheet.inputContainer}>
                <Input placeholder="Full Name" autoFocus type="text" value={name} onChangeText={text => setName(text)} />
                <Input placeholder="Email"  type="email" value={email} onChangeText={text => setEmail(text)} />
                <Input placeholder="Password" value={password} onChangeText={text => setPassword(text)} secureTextEntry type="password" />
                <Input placeholder="Profile Picture URL (Optional)" onSubmitEditing={register}  type="text" value={imageUrl} onChangeText={text => setImageUrl(text)} />
            </View>
            <Button disabled={!Input} raised containerStyle={styles.button} onPress={register} title="Register" />
            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen;

const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: 'white',
        padding: 10,
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10,
    }
});
