import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from 'react-native-elements';
import CustomListItem from "../components/CustomListItem";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";
import { auth, db } from "../firebase";

const HomeScreen = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace('Login');
        });
    };

    useEffect(() => {
        const unsubcribed = db.collection('chats').onSnapshot(snapshot => (
            setChats(snapshot.doc.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
        return unsubcribed;
    }, []);

    useLayoutEffect(() => {
        navigation.setOption({
            title: 'Signal',
            headerStyle: { backgroundColor: '#fff'},
            headerTitleStyle: { color: 'black'},
            headerTintColor: 'black',
            headerLeft: () => ( 
                <View style={{ marginLeft: 20 }}>
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5} >
                        <Avatar 
                            rounded
                            source={{ uri: auth?.currentUser?.photoURL }}
                        />
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => ( 
                <View style={{ marginRight: 20, flexDirection: "row", justifyContent: "space-between", width: 80 }}>
                    <TouchableOpacity activeOpacity={0.5} >
                        <AntDesign name="camerao" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("AddChat")
                    }} activeOpacity={0.5} >
                        <SimpleLineIcons name="pencil" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            )
        });
    },[navigation]);
    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id,
            chatName
        });
    };

    return(
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data: { chatName }}) => {
                    <CustomListItem id={id} chatName={chatName} enterChat={enterChat} key={id} />
                })}
             </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        height: "100%",
    }
});
