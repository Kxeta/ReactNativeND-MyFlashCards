import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import * as DecksActions from '../actions/deck';



class Deck extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.getParam("deck").name} Details`
  });

  render(){
    const {navigate} = this.props.navigation;
    const deckId = this.props.navigation.getParam("deck").id;
    const deck = this.props.decks.deckList.find(deck => deck.id === deckId);
    return (
      <View style={{flex: 1}}>
        <View>
          <Text>{deck.name}</Text>
          <Text>{deck.cards ? deck.cards.length : 0} cards</Text>
        </View>
        <TouchableOpacity onPress={() => navigate("AddCard", { deck: deck })}>
          <Text>Add Card</Text>
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
