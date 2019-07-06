import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Switch } from 'react-native';
import * as CardActions from '../actions/card';



class AddCard extends Component {

  state = {
    question: '',
    answer: false
  }

  handleSubmit = () => {
    const { question, answer } = this.state;
    const deck = this.props.navigation.getParam("deck");
    // console.log(deck);
    if(question.trim().length){
      this.props.addCard(deck.id, question, answer);
      this.setState({question: '', answer: false});
    }
  }

  render(){
    const { question } = this.state;
    const disabled = question.trim().length === 0;
    const {navigate} = this.props.navigation;
    const deck = this.props.navigation.getParam("deck");
    return (
      <View style={{flex: 1, paddingTop: 10}}>
      {this.props.decks.isLoading
      ? <View><Text> Loading ...</Text></View>
      : <KeyboardAvoidingView>
          <Text>New Question:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={question => {console.log(question); this.setState({question})}}
            value={this.state.question}
            onSubmitEditing={this.handleSubmit}
          />
          <Text>Is it correct?</Text>
          <Switch
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onValueChange={(isCorrect) => this.setState({answer: isCorrect})}
            value={this.state.answer}
          />
          <TouchableOpacity onPress={this.handleSubmit} disabled={disabled}>
            <Text>Add it!</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      }
      </View>
    );
  }
}

const mapStateToProps = decks => ({
  decks: decks.decks
});
const mapDispatchToProps = dispatch =>bindActionCreators(
  {
    addCard: CardActions.addCard,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddCard);
