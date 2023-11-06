const { EventBridgeClient, PutRuleCommand } = require("@aws-sdk/client-eventbridge");

exports.handler = async (event) => {
  const REGION = "ca-central-1"; // e.g., "us-west-2"
  const ebClient = new EventBridgeClient({ region: REGION });


  var rate =  Math.floor(Math.random() * 8) + 1;
  var newInterval = 'rate(' + rate + ' hours)';
  console.log("Updating schedule rate to ", newInterval); // Successful response returns ARN of rule

  // Set the parameters
  const params = {
    Name: 'pushToGit', // The name of the rule you want to update
    ScheduleExpression: newInterval, // The new schedule expression
    State: 'ENABLED', // Can be "ENABLED" or "DISABLED"
  };

  // Create the PutRuleCommand with the parameters
  const command = new PutRuleCommand(params);

  try {
    const data = await ebClient.send(command);
    console.log("Success", data.RuleArn); // Successful response returns ARN of rule
  } catch (err) {
    console.error("Error", err);
  }
};
