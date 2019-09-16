import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { Audio } from "expo-av";

export default class OptionSelector extends React.Component {
  static propTypes = {
    selectionColor: PropTypes.string,
    onPress: PropTypes.func,
    options: PropTypes.array
  };
  state = {
    selectedOption: ""
  };

  validateAns = () => {
    if (this.state.selectedOption === this.props.correctAnswer) {
      this.props.onSuccess();
    } else {
      this.props.onFailure();
    }
  };

  renderItem = ({ item }) => {
    const selected = this.state.selectedOption;
    const isCorrect = this.props.correctAnswer === item;
    const itemSelected = this.state.selectedOption === item;

    let backgroundColor = this.props.selectionColor;

    if (selected && itemSelected && isCorrect) {
      backgroundColor = "green";
    } else if (selected && itemSelected && !isCorrect) {
      backgroundColor = "red";
    } else if (selected && isCorrect) {
      backgroundColor = "green";
    }

    return (
      <TouchableOpacity
        onPress={async () => {
          this.setState({ selectedOption: item }, () => {
            this.props.onPress(this.state.selectedOption);
            this.validateAns();
          });
          const soundObject = new Audio.Sound();
          try {
            await soundObject.loadAsync(
              require("./assets/Sounds/popSound.mp3")
            );
            await soundObject.playAsync();
          } catch (error) {
            console.log(error);
          }
        }}
      >
        <View
          style={[
            Style.option,
            {
              elevation: this.state.selectedOption === item ? 3 : 0,
              backgroundColor
            }
          ]}
        >
          <Text>{item}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={Style.container}>
        <FlatList
          data={this.props.options}
          keyExtractor={item => item}
          renderItem={this.renderItem}
          extraData={this.state.selectedOption}
        ></FlatList>
      </View>
    );
  }
}

Style = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DCDCDC",
    borderRadius: 3
  },
  option: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    height: 40,
    flex: 0.8,
    borderRadius: 10,
    margin: 10,
    borderColor: "#aaa",
    padding: 10
  }
});
