import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import * as DecksActions from '../actions/deck';
import { gray, white, blue, orange, red, green } from '../util/colors';



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
      <View style={{backgroundColor: gray, flex: 1}}>
        <View style={{flex: 2, padding: 10, backgroundColor: white, justifyContent: "center", alignContent: "center", margin: 10, borderRadius: 10}}>
          <Text style={{fontSize: 25, color: blue, textAlign: "center"}}>Your score is:</Text>
          <Text style={{fontSize: 35 , color: score > 60 ? green : red, textAlign: "center"}}>{score}%</Text>
        </View>
        <TouchableOpacity onPress={() => this.handleRestart()} style={{width: "95%", padding: 10, backgroundColor: white, justifyContent: "center", alignContent: "center", margin: 10, borderRadius: 10}}>
          <Text style={{color: orange, fontSize: 15, textAlign: "center"}}>Try again</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Home")} style={{width: "95%", padding: 10, backgroundColor: white, justifyContent: "center", alignContent: "center", margin: 10, borderRadius: 10}}>
          <Text style={{color: orange, fontSize: 15, textAlign: "center"}}>Go back to My Decks</Text>
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
          : <View style={{flex: 1}}>
              <View style={{flex: 2, padding: 10, backgroundColor: gray, justifyContent: "center", alignContent: "center", margin: 10, borderRadius: 10}}>
                <Text style={{color: orange, textAlign: "center", fontSize: 15}}>{questionIndex + 1} / {hasCards} </Text>
                <Text style={{color: blue, fontSize: 30, textAlign: "center", marginVertical: 30, marginHorizontal: 10, alignSelf: "center"}}>{showAnswer ? cards[questionIndex].answer ? "TRUE" : "FALSE" : cards[questionIndex].question }</Text>
                <TouchableOpacity onPress={() => this.setState({showAnswer: !showAnswer})} style={{fontSize: 10}}>
                  <Text style={{textAlign: "center"}}>Show other side</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1}}>
              <Text style={{color: orange, fontSize: 30, textAlign: "center", marginTop: 10, marginBottom: 20, marginHorizontal: 10, alignSelf: "center"}}>What is the answer?</Text>
              <TouchableOpacity style={{padding: 10, backgroundColor: green, marginHorizontal: 10, marginVertical: 5, borderRadius: 10}} onPress={() => this.updateScoreAndNextQuestion(cards[questionIndex].answer, true)}>
                <Text style={{color: white, textAlign: "center"}}>Correct!</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ padding: 10, backgroundColor: red, marginHorizontal: 10, marginVertical: 5, borderRadius: 10}} onPress={() => this.updateScoreAndNextQuestion(cards[questionIndex].answer, false)}>
                <Text style={{color: white, textAlign: "center"}}>Wrong!</Text>
              </TouchableOpacity>
              </View>
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
