import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, TouchableOpacity, FlatList, Platform } from 'react-native';
import * as DecksActions from '../actions/deck';
import { orange, white, gray, blue } from '../util/colors';



class Decks extends Component {

  componentDidMount() {
    this.props.fetchDecks();
  }

  renderDeckList = () => {
    const {navigate} = this.props.navigation;
    return (
      this.props.decks.deckList && this.props.decks.deckList.length ? 
      <View style={{flex: 1}}>
        <FlatList 
          data={this.props.decks.deckList}
          renderItem={({item}) => 
            <TouchableOpacity onPress={() => navigate("Deck", { deck: item })} style={{backgroundColor: gray, textAlign: "center", padding: 20, borderRadius: 10, margin: 10}}>
              <Text style={{color: orange, fontSize: 25, alignSelf: "center", textTransform: "uppercase"}}>{item.name}</Text>
              <Text style={{color: blue, fontSize: 10, alignSelf: "center"}}>({item.cards ? item.cards.length : 0} cards)</Text>
          </TouchableOpacity>
          }
          keyExtractor={(item, index) => index.toString()}
        />
          <TouchableOpacity onPress={() => this.props.clearDecks()} style={{alignSelf: "flex-end"}}>
            <Text style={{color: "#e5e5e5"}}>Clear everything!</Text>
          </TouchableOpacity>
      </View>
      :
      <View>
        <Text style={{textAlign: "center", color: blue, fontSize: 20, marginBottom: 10}}>You don't have a deck yet...</Text>
        <Text style={{textAlign: "center", color: blue, fontSize: 20}}>How about creating one on the next tab?</Text>
      </View>
    )
  }

  render(){
    const isEmpty = this.props.decks.deckList && this.props.decks.deckList.length === 0;
    return (
      <View style={{flex: 1, justifyContent: !isEmpty ? "flex-start" : "center", backgroundColor: white}}>
      {this.props.decks.isLoading
      ? <Text> Loading ...</Text>
      : this.renderDeckList()
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
    fetchDecks: DecksActions.fetchDecks,
    clearDecks: DecksActions.clearDecks,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Decks);
