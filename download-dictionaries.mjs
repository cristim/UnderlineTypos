import { promises as fsPromises } from 'fs';
import fetch from 'node-fetch';

async function downloadFile(url, filePath) {
    const response = await fetch(url);
    const data = await response.text();
    await fsPromises.writeFile(filePath, data);
}

async function downloadDictionaries(langCode) {
    const affURL = `https://raw.githubusercontent.com/LibreOffice/dictionaries/master/en/${langCode}.aff`;
    const dicURL = `https://raw.githubusercontent.com/LibreOffice/dictionaries/master/en/${langCode}.dic`;
    const affFilePath = `./dictionaries/${langCode}.aff`;
    const dicFilePath = `./dictionaries/${langCode}.dic`;

    // Create the dictionaries directory if it doesn't exist
    try {
        await fsPromises.mkdir('./dictionaries');
    } catch (error) {
        // Ignore the error if the directory already exists
        if (error.code !== 'EEXIST') {
            console.error('Error creating dictionaries directory:', error);
            return;
        }
    }

    try {
        console.log(`Downloading ${langCode}.aff...`);
        await downloadFile(affURL, affFilePath);
        console.log(`${langCode}.aff downloaded successfully.`);
    } catch (error) {
        console.error(`Error downloading ${langCode}.aff:`, error);
    }

    try {
        console.log(`Downloading ${langCode}.dic...`);
        await downloadFile(dicURL, dicFilePath);
        console.log(`${langCode}.dic downloaded successfully.`);
    } catch (error) {
        console.error(`Error downloading ${langCode}.dic:`, error);
    }
}

downloadDictionaries('en_US');
