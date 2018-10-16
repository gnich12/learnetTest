<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3 class="mb-4 ">
        <p>Materials: Open books, notes, etc are permited to use!.</p>
        <p class="red--text">DO NOT CLOSE OR REFRESH PAGE WHILE DOING THE TEST OTHERWISE YOU HAVE TO START FROM THE BEGINNING!!!</p>
        <p>Good Luck!</p>
        <v-divider color="blue darken-2" inline style="border: 5px solid"></v-divider>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="mb-4 ">
        <v-text-field
          label="Enter your First and Last Name"
          v-model='name'
        ></v-text-field>
        <v-menu
        ref="menu"
        :close-on-content-click="false"
        v-model="menu"
        :nudge-right="40"
        :return-value.sync="today_date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          slot="activator"
          v-model="today_date"
          label="Choose Date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="today_date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(today_date)">OK</v-btn>
        </v-date-picker>
      </v-menu>
      </v-flex>
    </v-layout>
    <v-layout row wrap >
      <v-flex xs12 sm12>
          <v-form xs12 sm6 offset-sm3 ref="form" lazy-validation>
            <v-layout row wrap v-for="(it,i) in bank" :key="it.q_num">
            <template v-if="it.type == 'fb'">
              <v-flex xs12 sm6 offset-sm3 class="white--text darken-1 mb-4 ">
                <v-card>
                  <v-card-title primary-title class='primary white--text darken-1'>
                    <b>Question {{it.q_num}}</b>
                  </v-card-title>
                  <v-card-text class="text-xs-left">
                    {{it.question}}
                  </v-card-text>
                  <v-card-actions xs6>
                    <v-text-field
                      label="Write your answer here"
                      v-model="answer[i].a"
                      :onFocus="getNum(i)"
                    ></v-text-field>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </template>
            <template v-else>
              <v-flex xs12 sm6 offset-sm3 class="white--text darken-1 mb-4">
                <v-card>
                  <v-card-title primary-title class='primary white--text darken-2'>
                    Question {{it.q_num}}
                  </v-card-title>
                  <v-card-text class="text-xs-left">
                    {{it.question}}
                  </v-card-text>
                  <v-card-actions xs6>
                    <v-radio-group v-model="answer[i].a" label="Choose One">
                      <v-radio
                        v-for="n in it.options.split(',')"
                        :key="n"
                        :label="`${n}`"
                        :value="n.trim().toLowerCase()"
                        :onFocus="getNum(i)"
                      ></v-radio>
                    </v-radio-group>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </template>
        </v-layout>
      </v-form>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click.native='saveAnswers' :disabled="!checkTest()" :style="{display:bool}">Submit</v-btn>
      </v-flex>
    </v-layout>
     <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">C202-Final Exam</v-card-title>
        <v-card-text>
          Test Successful Submitted. Thanks!!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            Ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: 'Test',
  props: {
    msg: String
  },
  data () {
    return {
      bank: [],
      answer: [],
      name: '',
      today_date: null,
      menu: false,
      dialog: false,
      bool: ''
    }
  },
  created () {
    var vm = this
    firebase.database().ref('/questions/').once('value')
      .then(snap => {
        const obj = snap.val()
        for (let key in obj) {
          vm.bank.push(
            {
              question: obj[key].question,
              type: obj[key].type,
              q_num: obj[key].q_num,
              points: obj[key].points,
              options: obj[key].options,
              answer: obj[key].answer
            }
          )
          vm.answer.push({
            num: '',
            a: null
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    setAnswer (a) {
      this.answer[0].ans = a.trim().toLowerCase()
    },
    getNum (i) {
      this.answer[i].num = i + 1
    },
    checkTest () {
      let num = 1
      for (var it in this.answer) {
        if (this.answer[it].a !== null) {
          num++
        }
      }
      if (num < 30) {
        return false
      } else {
        return true
      }
    },
    saveAnswers () {
      let results = {
        name: this.name,
        date: this.today_date,
        q_answers: this.answer
      }
      firebase.database().ref('/answers/').push(results)
      this.bool = 'none'
      this.dialog = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
