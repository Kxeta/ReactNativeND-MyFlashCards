import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Switch } from 'react-native';
import * as CardActions from '../actions/card';
import { blue, white, gray, orange } from '../util/colors';



class AddCard extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam("deck").name} - New Question`
  });

  state = {
    question: '',
    answer: false
  }

  handleSubmit = () => {
    const { question, answer } = this.state;
    const deck = this.props.navigation.getParam("deck");
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
      <View style={{flex: 1, paddingTop: 10, backgroundColor: gray}}>
      {this.props.decks.isLoading
      ? <View><Text> Loading ...</Text></View>
      : <KeyboardAvoidingView>
          <Text style={{color: blue, fontSize: 15, textAlign: "center"}}>New Question:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10, paddingHorizontal: 5}}
            onChangeText={question => this.setState({question})}
            value={this.state.question}
            onSubmitEditing={this.handleSubmit}
          />
          <Text style={{color: blue, fontSize: 15, textAlign: "center"}}>Is it correct?</Text>
          <Switch
            style={{height: 40, alignSelf: "center", margin: 10}}
            onValueChange={(isCorrect) => this.setState({answer: isCorrect})}
            value={this.state.answer}
          />
          <TouchableOpacity onPress={this.handleSubmit} disabled={disabled} style={{width: "95%", padding: 10, backgroundColor: disabled ? gray : white, justifyContent: "center", alignContent: "center", margin: 10, borderRadius: 10}}>
            <Text style={{color: disabled ? white : orange, fontSize: 15, textAlign: "center"}}>Add it!</Text>
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
