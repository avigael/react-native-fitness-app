import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DatePicker from "react-native-datepicker";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      duration: "",
      calories: "",
      date: "",
    };
  }
  static navigationOptions = {
    title: "Add Exercise",
  };

  addActivity = () => {
    let name = this.state.name;
    let duration = this.state.duration;
    let calories = this.state.calories;

    let token = this.props.navigation.state.params.token;
    fetch("https://avigael-shop-fitness.herokuapp.com/activities", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "x-access-token": token,
        Connection: "keep-alive",
        "cache-control": "no-cache",
      },

      body: JSON.stringify({
        name: name,
        calories: calories,
        duration: duration,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.message === "Activity created!") {
          alert(result.message);
          this.props.navigation.navigate("Today", {
            username: this.props.navigation.state.params.username,
            token: this.props.navigation.state.params.token,
          });
        } else {
          alert(result.message);
        }
      });
  };

  async componentDidMount() {
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: "center",
      },
      box: {
        width: 339,
        height: 501,
        alignSelf: "center",
      },
      exercisename_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 69,
        marginLeft: 38,
      },
      exerciseName: {
        color: "#121212",
        marginTop: -16,
      },
      excersiceName: {
        color: "#121212",
        marginLeft: 15,
      },
      exerciseNameFiller: {
        flex: 1,
        justifyContent: "center",
      },
      duration_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 22,
        marginLeft: 38,
      },
      lastName: {
        color: "#121212",
        marginTop: -16,
      },
      duration2: {
        color: "#121212",
        marginLeft: 15,
      },
      lastNameFiller: {
        flex: 1,
        justifyContent: "center",
      },
      calorie_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 22,
        marginLeft: 38,
      },
      calories: {
        color: "#121212",
        marginTop: -16,
      },
      calhere: {
        color: "#121212",
        marginLeft: 15,
      },
      caloriesFiller: {
        flex: 1,
        justifyContent: "center",
      },
      activitygoal_box: {
        width: 262,
        height: 43,
        backgroundColor: "rgba(230,230,230,1)",
        borderRadius: 10,
        marginTop: 22,
        marginLeft: 38,
      },
      date2: {
        color: "#121212",
        marginTop: -16,
      },
      date2Filler: {
        flex: 1,
        justifyContent: "center",
      },
      button2: {
        width: 150,
        height: 43,
        backgroundColor: "rgba(74,144,226,1)",
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 22,
        marginLeft: 94,
      },
      submit: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        alignSelf: "center",
      },
      button: {
        width: 150,
        height: 43,
        backgroundColor: "rgba(225,72,72,1)",
        borderRadius: 10,
        justifyContent: "center",
        marginTop: 17,
        marginLeft: 94,
      },
      logOut: {
        color: "rgba(255,255,255,1)",
        fontSize: 20,
        alignSelf: "center",
      },
    });

    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.exercisename_box}>
            <Text style={styles.exerciseName}>Exercise Name</Text>
            <View style={styles.exerciseNameFiller}>
              <TextInput
                placeholder={"Exercise Name"}
                style={styles.excersiceName}
                value={this.state.name + ""}
                onChangeText={(input) => {
                  this.setState({ name: input });
                }}
              />
            </View>
          </View>
          <View style={styles.duration_box}>
            <Text style={styles.lastName}>Duration</Text>
            <View style={styles.lastNameFiller}>
              <TextInput
                placeholder={"0"}
                style={styles.duration2}
                value={this.state.duration + ""}
                onChangeText={(input) => {
                  this.setState({ duration: input });
                }}
              />
            </View>
          </View>
          <View style={styles.calorie_box}>
            <Text style={styles.calories}>Calories</Text>
            <View style={styles.caloriesFiller}>
              <TextInput
                style={styles.calhere}
                value={this.state.calories + ""}
                placeholder={"0"}
                onChangeText={(input) => {
                  this.setState({ calories: input });
                }}
              />
            </View>
          </View>
          <View style={styles.activitygoal_box}>
            <Text style={styles.date2}>Date</Text>
            <View style={styles.date2Filler}>
              <DatePicker
                style={{ width: "100%" }}
                date={this.state.date}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Add Date"
                cancelBtnText="Cancel"
                onDateChange={(input) => {
                  this.setState({ date: input });
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => this.addActivity()}
            style={styles.button2}
          >
            <Text style={styles.submit}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Login")}
            style={styles.button}
          >
            <Text style={styles.logOut}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Exercise;
