import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, RefreshControl } from 'react-native';

export default function BooksScreen({navigation}) {

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetch(`http://localhost:3001/books`, {
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
                    setBooks(jsonRes);
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
  

    const [books, setBooks] = React.useState([])

      React.useEffect(()=>{
        fetch(`http://localhost:3001/books`, {
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
                    setBooks(jsonRes);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
      }, [])  

      
    return (
        <ScrollView style={{ flex: 1 }}>
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        
            <View style={styles.container}>
            <Text style={styles.heading}>Books:</Text>
            <View style={{alignItems: 'center' }}>
            {books.map((book, index)=>(
                <View style={styles.card} key={index}>
                        <Image   style={styles.stretch} source={{ uri: book.image}}/>
                        <Text style={styles.names} >{book.title}</Text>
                        <Text>Pages:{book.pages}</Text>
                        <Text>{book.price}$ </Text>
                </View>
                 ))}
            </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
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
        maxHeight: 410,
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
        marginHorizontal: '12%'
    },
    button: {
        width: '80%',
        backgroundColor: 'black',
        height: 40,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '400'
    },
  });
  