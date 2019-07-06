import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity } from 'react-native';
import * as DecksActions from '../actions/deck';



class Decks extends Component {

  componentDidMount() {
    this.props.fetchDecks();
  }

  render(){
    const isEmpty = this.props.decks.deckList && this.props.decks.deckList.length === 0;
    const {navigate} = this.props.navigation;
    return (
      <View style={{flex: 1, justifyContent: !isEmpty ? "flex-start" : "center"}}>
      {this.props.decks.isLoading
      ? <Text> Loading ...</Text>
      :
        this.props.decks.deckList && this.props.decks.deckList.length ? 
        this.props.decks.deckList.map((deck,key) => 
        <TouchableOpacity key={key} onPress={() => navigate("Deck", { deck: deck })}>
          <Text>{deck.name}</Text>
          <Text>{deck.cards ? deck.cards.length : 0} cards</Text>
        </TouchableOpacity>
        )
        :
          <Text style={{textAlign: "center"}}>You don't have a deck yet... How about creating one on the next tab?</Text>
      }
        <TouchableOpacity onPress={() => this.props.clearDecks()}>
          <Text>Remove!</Text>
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
)(Decks);
