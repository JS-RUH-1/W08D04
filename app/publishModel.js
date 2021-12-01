import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform } from 'react-native';

export default function publishModel({route, navigation}) {
    const API_URL = 'http://192.168.100.16:3001';

    const {author_id, book_id} = route.params;
    const [book, setBook] = useState({});

      const publish = () => {
        fetch(`${API_URL}/books`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify({...book, author_id: author_id}),
        })
        .then(async res => { 
            try {
                if (res.status === 200) {
                    // console.log(res)
                    navigation.goBack()
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
      }

      const updateBook = () => {
        fetch(`${API_URL}/books/${book_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`, 
            },
            body: JSON.stringify(book),
        })
        .then(async res => { 
            try {
                if (res.status === 200) {
                    // console.log(res)
                    navigation.goBack()
                    // setRefresh(refresh+1)
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
      }

    return (
            <View style={styles.container}>
            <View style={styles.card}>
            <Text style={styles.heading}>{book_id ? 'Editing':'Publishing'}</Text>
                <View style={styles.form}>
                    <View style={styles.inputs}>
                        <TextInput style={styles.input} placeholder="Title" onChangeText={(text) => {setBook({...book, title: text})}}></TextInput>
                        <TextInput style={styles.input} placeholder="Price" keyboardType="numeric" onChangeText={(text) => {setBook({...book, price: parseInt(text)})}}></TextInput>
                        <TextInput style={styles.input} placeholder="Pages" keyboardType="numeric" onChangeText={(text) => {setBook({...book, pages: parseInt(text) })}}></TextInput>
                        <TextInput style={styles.input} placeholder="Image URL" onChangeText={(text) => {setBook({...book, image: text})}}></TextInput>
                        <TouchableOpacity style={styles.button} onPress={()=> book_id ? updateBook(): publish() }>
                            <Text style={styles.buttonText}>{book_id ? 'Edit':'Publish'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonAlt} onPress={()=> navigation.goBack()}>
                            <Text style={styles.buttonAltText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>    
                </View>
            </View>
      </View> 
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    image: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },  
    card: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        width: '80%',
        marginTop: '40%',
        borderRadius: 20,
        maxHeight: 380,
        paddingBottom: '30%',
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
        marginTop: '5%',
        marginBottom: '30%',
        color: 'black',
    },
    form: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: '5%',
    },
    inputs: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '10%',
    },  
    input: {
        width: '80%',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        paddingTop: 10,
        fontSize: 16, 
        minHeight: 40,
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
    buttonAlt: {
        width: '80%',
        borderWidth: 1,
        height: 40,
        borderRadius: 50,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
    },
    buttonAltText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '400',
    },
    message: {
        fontSize: 16,
        marginVertical: '5%',
    },
});
