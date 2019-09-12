# react-native-optionselector

# Installation
npm install react-native-optionselector

# Properties
selectionColor => takes a hex colour string to higlight the selected option

onPress => takes a function to update the value of selected option in the parent component

example snippet

setSelectedOption = option => {
    this.setState({ selectedValue: option });
};

<OptionSelector onPress={this.setSelectedOption}

options => takes a list of string where each element of string is an option

