import React, { Component } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Pluralize from 'pluralize';

class Deck extends Component {
    render() {
      const { decks, id, navigation } = this.props;

      return (
        <TouchableOpacity
          style={styles.deckButton}
          onPress={() => navigation.navigate('DeckDetail', { id: id })}
        >
          <Text style={{ fontSize: 20 }}>{decks[id].title}</Text>
          <Text style={{ fontSize: 16, color: 'gray' }}>{Pluralize('card', decks[id].questions.length, true)}</Text>
        </TouchableOpacity>
      );
    }
};

const styles = StyleSheet.create({
  deckButton: {
    alignItems: 'center', padding: 10, margin: 10, backgroundColor: 'white'
  }
});

function mapStateToProps(decks) {
  return { decks };
}

export default connect(mapStateToProps)(Deck);
