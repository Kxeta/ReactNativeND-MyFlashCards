import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as DecksActions from '../actions/deck';



class AddDeck extends Component {

  state = {
    name: ''
  }

  handleSubmit = () => {
    const { name } = this.state;
    if(name.trim().length){
      this.props.createDeck(name);
      this.setState({name: ''});
    }
  }

  render(){
    const { name } = this.state;
    const disabled = name.trim().length === 0;
    return (
      <View style={{flex: 1, justifyContent: "center"}}>
      {this.props.decks.isLoading
      ? <Text> Loading ...</Text>
      :
        <View>
          <Text>New Deck Name:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            onSubmitEditing={this.handleSubmit}
          />
          <TouchableOpacity onPress={this.handleSubmit} disabled={disabled}>
            <Text>Save</Text>
          </TouchableOpacity>

        </View>
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
    createDeck: DecksActions.createDeck,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeck);
