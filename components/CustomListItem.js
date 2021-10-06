import React, {useEffect, useState } from "react";
import { Avatar, Listitem } from "react-native-elements";
import { db } from "../firebase";
 
const CustomListItem = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);

    useEffect(() => {
        const unsubcribe = db.collection("chat").doc(id).collection('messages')
        .orderBy("timestamp", 'desc').onSnapshot((snapshot) => {
            setChatMessages(snapshot.doc.map((doc) => doc.data()))
        })
        return unsubcribe;
    }, []);
    return(
         <Listitem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider> 
             <Avatar
                rounded
                source={{
                    uri: chatMessages?.[0]?.photoURL ||
                       "avater.png",
                }} 
             />
             <Listitem.Content>
                 <Listitem.Title style={{ fontWeight: "800"}}>
                     {chatName}
                 </Listitem.Title>
                 <Listitem.Subtitle numberOfLine={1} ellipsizeMode="tail">
                    {chatMessages?.[0]?.displayName}: {chatMessages?.[0]?.message}
                 </Listitem.Subtitle>
             </Listitem.Content>
         </Listitem>
    )
}

export default CustomListItem;
