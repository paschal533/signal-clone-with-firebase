import React, { useLayoutEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Input } from "react-native-elements/dist/input/Input";
import { db } from '../firebase';

const AddChat = ({ navigation }) => {
    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats",
        });
    },[navigation])

    const createChat = async () => {
        await db.collection('Chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack();
        }).catch((error) => alert(error));
    }
    return (
        <View style={styles.container}>
            <Input placeholder="Enter a Chat name" onSubmitEditing={createChat} value={input} onChange={(text) => setInput(text)}
            leftIcon={
                <Icon name='weChat' type="antdesign" size={24} color="black" />
            } />
            <Button  disabled={!input} onPress={createChat}  title="Create new Chat" />
        </View>
    )
}

export default AddChat;
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 30,
        height: '100%',
    }
})
