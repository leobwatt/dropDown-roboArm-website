const motorAngle = document.getElementById('motor_angle');
const connectedDiv = document.getElementById('connected');
let port;
let reader;
let savedAngle = 90;

connectedDiv.style.display = 'none';

// Connect to Arduino
async function connect() {
  try {
    // Request port and open connection
    port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    console.log('Connected to the serial port!');

    // Create the reader once
    reader = port.readable.getReader();

  } catch (error) {
    console.error('Error connecting to the serial port:', error);
  }
  connectedDiv.style.display = 'block';
}


async function sendAngleElbow() {
  const angleSelectElbow = document.getElementById('elbowAngles');
  const selectedAngleElbow = angleSelectElbow.options[angleSelectElbow.selectedIndex].value;
  console.log('Selected angle:', selectedAngleElbow);

  sendSerial(selectedAngleElbow);
}

async function sendAngleShoulder() {
  const angleSelectShoulder = document.getElementById('shoulderAngles');
  const selectedAngleShoulder = angleSelectShoulder.options[angleSelectShoulder.selectedIndex].value;
  console.log('Selected angle:', selectedAngleShoulder);

  sendSerial(selectedAngleShoulder);
}

async function sendAngleBase() {
  const angleSelectBase = document.getElementById('baseAngles');
  const selectedAngleBase = angleSelectBase.options[angleSelectBase.selectedIndex].value;
  console.log('Selected angle:', selectedAngleBase);

  sendSerial(selectedAngleBase);
}

async function sendSerial(message) {
  if (!port) {
    console.error('No serial port connected.');
    return;
  }

  try {
    // Encode and send data
    const writer = port.writable.getWriter();
    const encoder = new TextEncoder();
    const encodedAngle = encoder.encode(message.toString());
    await writer.write(encodedAngle);
    console.log('Data sent:', encodedAngle);
    writer.releaseLock();
  } catch (error) {
    console.error('Error sending data:', error);
  }
}
