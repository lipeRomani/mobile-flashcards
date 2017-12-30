import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import Pluralize from 'pluralize';

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return { title: navigation.state.params.id };
  }

  render() {
    const { deck, navigation } = this.props;

    return (
      <View style={styles.mainView}>
        <View style={styles.title}>
          <Text style={{ fontSize: 40 }}>{deck.title}</Text>
          <Text style={{ fontSize: 30, color: 'gray' }}>
            {Pluralize('card', deck.questions.length, true)}
          </Text>
        </View>

        <View style={{ alignItems: 'center' }}>
          <View style={styles.button}>
            <Button
              onPress={() => navigation.navigate('AddCard', { id: navigation.state.params.id })}
              title='Add Card'
              style={styles.button}
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={() => navigation.navigate('Quiz', { id: navigation.state.params.id })}
              title='Start Quiz' style={styles.button}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  title: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    padding: 10,
    margin: 10,
    alignItems: 'center'
  },
  button: {
    margin: 20,
    width: 220
  }
});

function mapStateToProps(decks, ownProps) {
  const deck = decks[ownProps.navigation.state.params.id];
  return { deck };
}

export default connect(mapStateToProps)(DeckDetail);
