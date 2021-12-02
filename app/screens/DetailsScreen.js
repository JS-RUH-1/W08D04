import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';

export default function DetailsScreen({navigation}) {
    const API_URL = 'http://192.168.100.16:3001';
    const [authors, setAuthors] = React.useState([])
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetch(`${API_URL}/authors`, {
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
                    setAuthors(jsonRes);
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
        fetch(`${API_URL}/authors`, {
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
                    setAuthors(jsonRes);
                }
            } catch (err) {
                console.log(err);
            };
        })
        .catch(err => {
            console.log(err);
        });
      }, [])  

      const viewDetails = (id, name) => {
        navigation.navigate('AuthorScreen', { id: id, name: name })
      }

      
    return (
        <ScrollView style={{ flex: 1 }}>
                      <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
            <View style={styles.container}>
            <Text style={styles.heading}>Authors:</Text>
            <View style={{alignItems: 'center' }}>
            {authors.map((author, index)=>(
                <View style={styles.card} key={index}>
                        <Image   style={styles.stretch} source={{ uri: author.image}}/>
                        <Text style={styles.names} >{author.name}</Text>
                        <Text >{author.nationality}, {author.gender}, {author.age} years old.</Text>
                    <TouchableOpacity style={styles.button} onPress={() => viewDetails(author._id, author.name)}>
                        <Text style={styles.buttonText}>Show Books</Text>
                    </TouchableOpacity>
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
  