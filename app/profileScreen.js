import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import * as SecureStore from 'expo-secure-store';

export default function profileScreen({route, navigation}) {
    const {id, name} = route.params;

    // React.useEffect(()=>{
    //     console.log(id)
    // }, []);

    async function logOut() {
        await SecureStore.deleteItemAsync('token');
        navigation.replace('AuthScreen')

      }

    const [books, setBooks] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      fetch(`http://localhost:3001/books/${id}`, {
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
                setRefreshing(false)
            }
        } catch (err) {
            console.log(err);
        };
    })
    .catch(err => {
        console.log(err);
    });
    }, []);

      React.useEffect(()=>{
        fetch(`http://localhost:3001/books/${id}`, {
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
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
      }, [])  


      const deleteBook = (id) => {
        fetch(`http://localhost:3001/books/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer ${token}`, 
            },
        })
        .then(async res => { 
            try {
                if (res.status === 200) {
                    // console.log(res)
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
        <ScrollView>
        <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        <View style={styles.container}>
            <Text style={styles.heading}>{name}</Text>
            <TouchableOpacity style={styles.button} onPress={() => logOut()}>
                <Text style={styles.buttonText}>Log out</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('publishModel', { author_id: id})}>
                <Text style={styles.buttonText}>Publish</Text>
            </TouchableOpacity>
            {books? books.map((book, index)=>(
                <View style={styles.card} key={index}>
                        <Image   style={styles.stretch} source={{ uri: book.image}}/>
                        <Text style={styles.names} >{book.title}</Text>
                        <Text>Pages:{book.pages}</Text>
                        <Text>{book.price}$ </Text>
                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('publishModel', { book_id: book._id})}>
                            <Text style={styles.buttonText}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => deleteBook(book._id)}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </TouchableOpacity>
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