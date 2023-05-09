# UnderlineTypos

UnderlineTypos is a simple Chrome extension that underlines spelling errors in the current browser tab. It uses the Typo.js library for spell checking based on Libreoffice dictionaries.

## Getting Started

### Prerequisites

To build and run this extension, you need to have Node.js and npm (Node Package Manager) installed on your machine. You can download the latest version of Node.js from the official [website](https://nodejs.org/en/download/) or use your package manager.

### Installing Dependencies

To install the required dependencies, navigate to the project root directory and run the following command:

```sh
npm install
```

### Building the Application

To build the extension, run the following command:

```sh
npm run download-dictionaries
npm run build
```

This will compile the TypeScript code to JavaScript and generate some files in the `dist` directory.

### Installing the extension locally

To run the extension, open the chrome://extensions/ and use the Load Unpacked button, pointing to the dist directory.

## Usage

Once you have it installed running, simply open any webpage. The extension will automatically highlight any misspelled words.

Here's how it looked like against my leanercloud.com website:
![screenshot](https://i.postimg.cc/zzF3pGKC/Screenshot-2023-05-09-at-22-56-39.png)

## Known issues

- the LibreOffice dictionaries are hardcoded to en_US, and also seem to be missing many words
- it doesn't handle some punctuation characters
- it messes up with the DOM in some cases
- it's slowing down the browser
- dictionaries are downloaded and built into the extension at compile time.

## Contributing

If you find any bugs or issues with this extension, feel free to open an issue on GitHub or submit a pull request with a fix. We welcome contributions from the community.


## License

This application is licensed under the MIT License. See the `LICENSE` file for more information.
