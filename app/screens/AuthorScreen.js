import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function AuthorScreen({route}) {
    const {id, name} = route.params;
    // const API_URL = 'http://192.168.100.16:3001';
    const API_URL =  'http://localhost:3001'

    const [books, setBooks] = React.useState([])
    const [refresh, setRefresh] = React.useState(0)

      React.useEffect(()=>{
        fetch(`${API_URL}/books/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { 
            try {
                const jsonRes = await res.json();
                if (res.status === 200) {
                    setBooks(jsonRes)
                    // console.log(jsonRes)
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
      }, [refresh])  


    return (
        <ScrollView>
        <View style={styles.container}>
            <Text style={styles.heading}>{name}</Text>
            {books? books.map((book, index)=>(
                <View style={styles.card} key={index}>
                        <Image   style={styles.stretch} source={{ uri: book.image}}/>
                        <Text style={styles.names} >{book.title}</Text>
                        <Text>Pages:{book.pages}</Text>
                        <Text>{book.price}$ </Text>
                </View>
                 )): <Text>Ooops! You have no published books!</Text>}
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 100,
      },
    stretch: {
        width: 200,
        height: 200,
    },
    card: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        width: '80%',
        marginTop: '10%',
        borderRadius: 20,
        maxHeight: 500,
        paddingVertical: '10%',
        alignItems: 'center',
    },
    names: {
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: '5%',
        color: 'black',
        textAlign: 'center'
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: '8%'
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
  });
  