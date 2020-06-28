const { attributes } = require('structure');

const Survey = attributes({
  id: Number,
  question: {
    type: String,
    required: true
  },
  option: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})(class Survey {
  isValid() {
    console.log("@@####### ------------- ", this.option);
    return Survey.VALID_OPTION.indexOf(this.option) > -1;
  }
});

Survey.VALID_OPTION = [true, false]
module.exports = Survey;
