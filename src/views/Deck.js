import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import * as DecksActions from '../actions/deck';
import { gray, orange, blue, white } from '../util/colors';



class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam("deck").name} Details`
  });

  render(){
    const {navigate} = this.props.navigation;
    const deckId = this.props.navigation.getParam("deck").id;
    const deck = this.props.decks.deckList.find(deck => deck.id === deckId);
    return (
      <View style={{flex: 1, justifyContent: "center", backgroundColor: gray}}>
        <View style={{marginBottom: 20}}>
          <Text style={{color: orange, fontSize: 45, alignSelf: "center", textTransform: "uppercase"}}>{deck.name}</Text>
          <Text style={{color: blue, fontSize: 20, alignSelf: "center"}}>{deck.cards ? deck.cards.length : 0} cards</Text>
        </View>
        <TouchableOpacity onPress={() => navigate("AddCard", { deck: deck })} style={{width: "95%", padding: 10, backgroundColor: white, justifyContent: "center", alignContent: "center", margin: 10, borderRadius: 10}}>
          <Text style={{color: orange, fontSize: 15, textAlign: "center"}}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate("Quiz", { deck: deck })} disabled={!deck.cards || deck.cards.length === 0}  style={{width: "95%", padding: 10, backgroundColor: !deck.cards || deck.cards.length === 0 ? gray : white, justifyContent: "center", alignContent: "center", margin: 10, borderRadius: 10}}>
          <Text style={{color: !deck.cards || deck.cards.length === 0 ? white : orange, fontSize: 15, textAlign: "center"}}>Quiz me!</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = decks => ({
  decks: decks.decks
});
const mapDispatchToProps = dispatch =>bindActionCreators(
  {
    fetchDecks: DecksActions.fetchDecks,
    clearDecks: DecksActions.clearDecks,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deck);
