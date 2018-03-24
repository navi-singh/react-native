import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { getTheme } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../actions';

const theme = getTheme();

const styles = StyleSheet.create({
    card: {
        marginTop: 20,
    },
    title: {
        top: 20,
        left: 80,
        fontSize: 24,
    },
    image: {
        height: 100,
    },
    aciton: {
        backgroundColor: 'black',
        color: 'white',
    },
    icon: {
        position: 'absolute',
        top: 15,
        left: 0,
        color: 'white',
        backgroundColor: 'rgba(255,255,255,0)',
    },
});

const PeopleItem = (props) => {
    return (
        <View style={[theme.cardStyle, styles.card]}>
            <Image
                source={{uri: '/Users/navi/Desktop/react/crm/src/images/background.jpg'}} 
                style={[theme.cardImageStyle, styles.image]}
            />
            <Icon
                name={'user'}
                sizw={100}
                style={styles.icon}
            />
            <Text style={[theme.cardTitleStyle, styles.title]}>{props.people.first_name}</Text>
            <Text style={[theme.cardActionStyle, styles.action]}>{props.people.company}</Text>
        </View>
    );
}

export default connect(null, actions)(PeopleItem);