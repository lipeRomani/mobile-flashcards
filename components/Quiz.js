import React, { Component } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { clearLocalNotification, setLocalNotification } from '../utils/notification';

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    return { title: `${navigation.state.params.id} Quiz` };
  }

  state = {
    currentCard: 0,
    showQuestion: true,
    quizCompleted: false,
    correctAnswerCount: 0
  }

  incrementCard(correct) {
    const { currentCard, correctAnswerCount } = this.state;
    const { questions } = this.props.deck;
    const newCard = currentCard + 1;
    const newCount = correct ? correctAnswerCount + 1 : correctAnswerCount;

    if (newCard < questions.length) {
      this.setState({
        currentCard: newCard,
        showQuestion: true,
        correctAnswerCount: newCount
      });
    } else {
      this.setState({
        showQuestion: true,
        quizCompleted: true,
        correctAnswerCount: newCount
      });
    }
  }

  renderQuestion() {
    const { currentCard } = this.state;
    const question = this.props.deck.questions[currentCard];

    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 30, padding: 10, textAlign: 'center' }}>{question.question}</Text>
        </View>
        <View style={styles.button}>
          <Button
            title='Answer'
            onPress={() => this.setState({ showQuestion: false })}
          />
        </View>
      </View>
    );
  }
  
  renderAnswer() {
    const { currentCard } = this.state;
    const question = this.props.deck.questions[currentCard];

    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 30, padding: 10, textAlign: 'center' }}>{question.answer}</Text>
        </View>
        <View style={styles.button}>
          <Button
            title='Question'
            onPress={() => this.setState({ showQuestion: true })}
          />
        </View>
      </View>
    );
  }

  renderQuiz() {
    const { currentCard, showQuestion } = this.state;
    const { questions } = this.props.deck;

    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 18 }}>Card {currentCard + 1} of {questions.length}</Text>
        {showQuestion ? this.renderQuestion() : this.renderAnswer()}

        <View style={styles.button}>
          <Button
            color='green'
            title='Correct'
            onPress={() => this.incrementCard(true)}
          />
        </View>

        <View style={styles.button}>
          <Button
            color='red'
            title='Incorrect'
            onPress={() => this.incrementCard(false)}
          />
        </View>
      </View>
    );
  }

  restartQuiz() {
    this.setState({
      currentCard: 0,
      showQuestion: true,
      quizCompleted: false,
      correctAnswerCount: 0
    });
  }

  renderQuizComplete() {
    const { correctAnswerCount } = this.state;
    const { questions } = this.props.deck;

    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 30, padding: 10, textAlign: 'center' }}>
          You answered {correctAnswerCount} out of {questions.length} questions correctly!
        </Text>

        <View style={styles.button}>
          <Button
            title='Restart Quiz'
            onPress={() => this.restartQuiz()}
          />
        </View>

        <View style={styles.button}>
          <Button
            title='Back to Deck'
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
      </View>
    );
  }
  
  render() {
    const { quizCompleted } = this.state;
    const { questions } = this.props.deck;

    if (questions.length === 0) {
      return (
        <Text style={{ fontSize: 30, textAlign: 'center', padding: 10 }}>
          There aren't any cards in this deck! Please add cards before starting a quiz.
        </Text>
      );
    }
    return (
      <View style={styles.container}>
        {!quizCompleted
          ? this.renderQuiz()
          : this.renderQuizComplete()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, alignItems: 'center'
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

export default connect(mapStateToProps)(Quiz);
