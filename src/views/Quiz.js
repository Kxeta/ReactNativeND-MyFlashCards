import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import * as DecksActions from '../actions/deck';



class Quiz extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam("deck").name} Quiz`
  });

  state = {
    questionIndex: 0,
    correctQuestions: 0,
    wrongQuestions: 0,
    showResults: false,
    showAnswer: false,
    cards: []
  }

  componentDidMount() {
    const deckId = this.props.navigation.getParam("deck").id;
    const deck = this.props.decks.deckList.find(deck => deck.id === deckId);
    const cards = this.shuffleArray(deck.cards);
    this.setState({
      cards
    });
  }

  shuffleArray = array => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
  }

  updateScoreAndNextQuestion = (answer, userAnswer) => {
    const deckId = this.props.navigation.getParam("deck").id;
    const { questionIndex, correctQuestions, wrongQuestions } = this.state;
    const deck = this.props.decks.deckList.find(deck => deck.id === deckId);
    if(questionIndex === deck.cards.length - 1){
      if(answer === userAnswer) {
        this.setState({
          showResults: true,
          correctQuestions: correctQuestions + 1
        })
      }
      else {
        this.setState({
          showResults: true,
          wrongQuestions: wrongQuestions + 1
        })
      }  
    }
    else{
      if(answer === userAnswer) {
        this.setState({
          questionIndex: questionIndex + 1,
          correctQuestions: correctQuestions + 1
        })
      }
      else {
        this.setState({
          questionIndex: questionIndex + 1,
          wrongQuestions: wrongQuestions + 1
        })
      }
    }
  }

  handleRestart = () => {
    const { cards } = this.state;
    this.setState({
      questionIndex: 0,
      correctQuestions: 0,
      wrongQuestions: 0,
      showResults: false,
      showAnswer: false,
      cards: this.shuffleArray(cards)
    })
  }

  renderResults = score => {
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1}}>
        <Text>Your score is:</Text>
        <Text>{score}</Text>
        <TouchableOpacity onPress={() => this.handleRestart()}>
          <Text>Try again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Home")}>
          <Text>Go back to My Decks</Text>
        </TouchableOpacity>

      </View>
    )
  }

  render(){
    const { questionIndex, correctQuestions, showResults, cards, showAnswer } = this.state;
    const hasCards = cards && cards.length;
    const result = hasCards ? ((correctQuestions/cards.length) * 100).toFixed(2) : 0; 
    return ( hasCards ? 
      <View style={{flex: 1}}>
        { showResults
          ? this.renderResults(result)
          : <View>
              <View>
                <Text>{showAnswer ? cards[questionIndex].answer : cards[questionIndex].question }</Text>
              </View>
              <Text>What is the answer?</Text>
              <TouchableOpacity onPress={() => this.updateScoreAndNextQuestion(cards[questionIndex].answer, true)}>
                <Text>Correct!</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.updateScoreAndNextQuestion(cards[questionIndex].answer, false)}>
                <Text>Wrong!</Text>
              </TouchableOpacity>
            </View>
        }
      </View>
      : null
    );
  }
}

const mapStateToProps = decks => ({
  decks: decks.decks
});

export default connect(
  mapStateToProps
)(Quiz);
