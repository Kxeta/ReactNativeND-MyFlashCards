import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import * as DecksActions from '../actions/deck';
import { white, orange, gray, blue } from '../util/colors';



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
      <View style={{flex: 1, paddingTop: 10, backgroundColor: gray}}>
      {this.props.decks.isLoading
      ? <View><Text> Loading ...</Text></View>
      : <KeyboardAvoidingView>
          <Text style={{color: blue, fontSize: 15, textAlign: "center"}}>New Deck Name:</Text>
          <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 10, margin: 10, paddingHorizontal: 5}}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
            onSubmitEditing={this.handleSubmit}
          />
          <TouchableOpacity onPress={this.handleSubmit} disabled={disabled} style={{width: "95%", padding: 10, backgroundColor: disabled ? gray : white, justifyContent: "center", alignContent: "center", margin: 10, borderRadius: 10}}>
            <Text style={{color: disabled ? white : orange, fontSize: 15, textAlign: "center"}}>Save</Text>
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
    createDeck: DecksActions.createDeck,
  },
  dispatch,
);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddDeck);
