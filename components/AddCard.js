import React, { Component } from 'react';
import { TextInput, View, Button, Alert, Platform, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { saveCardToDeck } from '../utils/api';
import { addCardToDeck } from '../actions';

class AddCard extends Component {
  static navigationOptions = ({navigation}) => {
    return { title: `Add card to ${navigation.state.params.id}` };
  };

  state = {
    question: '',
    answer: ''
  }

  clear = () => {
    this.setState({ question: '', answer: '' });
  }

  submit = () => {
    const { id } = this.props.navigation.state.params;
    const { question, answer } = this.state;
    const newCard = { question: question, answer: answer };

    saveCardToDeck(id, newCard);
    this.props.addCardToDeck(id, newCard);

    Alert.alert(
      'Card added!',
      'You can continue adding cards on this page if you did like.'
    )

    this.clear();
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='Question'
          onChangeText={(question) => this.setState({ question: question })}
          value={this.state.question}
        />

        <TextInput
          style={styles.input}
          placeholder='Answer'
          onChangeText={(answer) => this.setState({ answer: answer })}
          value={this.state.answer}
        />

        <View style={styles.button}>
          <Button
            style={{ height: 40 }}
            title='Submit'
            onPress={this.submit}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start'
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    padding: 10,
    margin: 10
  },
  input: {
    fontSize: 30,
    alignSelf: 'stretch',
    borderColor: 'gray',
    borderWidth: Platform.OS === 'ios' ? 1 : 0,
    padding: 10,
    margin: 10
  },
  button: {
    margin: 20,
    width: 220
  }
});

function mapDispatchToProps(dispatch) {
  return {
    addCardToDeck: (deck, card) => dispatch(addCardToDeck(deck, card))
  };
}

export default connect(null, mapDispatchToProps)(AddCard);
