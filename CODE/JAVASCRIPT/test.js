// -- IMPORTS

import
    {
        CappedMap,
        getDateTimeSuffix,
        getFileExtension,
        getFileLabel,
        getFileName,
        getFilePath,
        getFolderPath,
        getQuotedText,
        getUniversalDateTime
    }
    from './index.js';

// -- FUNCTIONS

function checkResult(
    value,
    expectedValue
    )
{
    console.log( 'Value :', JSON.stringify( value ) );
    console.log( 'Expected value :', JSON.stringify( expectedValue ) );

    if ( value !== expectedValue )
    {
        throw new Error( 'Invalid value : ' + JSON.stringify( value ) );
    }
}

function checkResultMatch(
    value,
    expectedValueExpression
    )
{
    console.log( 'Value :', JSON.stringify( value ) );
    console.log( 'Expected value :', expectedValueExpression.source );

    if ( !expectedValueExpression.test( value ) )
    {
        throw new Error( 'Invalid value : ' + JSON.stringify( value ) );
    }
}

// ~~

function runTests(
    )
{
    console.log( 'Testing : CappedMap' );

    let cappedMap = new CappedMap( 3 );
    cappedMap.set( 'key1', 'Element 1' );
    cappedMap.set( 'key2', 'Element 2' );
    cappedMap.set( 'key3', 'Element 3' );
    checkResult( cappedMap.has( 'key1' ), true );
    checkResult( cappedMap.has( 'key4' ), false );
    checkResult( cappedMap.get( 'key1' ), 'Element 1' );
    checkResult( cappedMap.get( 'key2' ), 'Element 2' );
    checkResult( cappedMap.get( 'key3' ), 'Element 3' );
    cappedMap.set( 'key4', 'Element 4' );
    checkResult( cappedMap.has( 'key1' ), false );
    checkResult( cappedMap.has( 'key4' ), true );
    checkResult( cappedMap.get( 'key1', 'not found' ), 'not found' );
    checkResult( cappedMap.get( 'key2' ), 'Element 2' );
    checkResult( cappedMap.get( 'key3' ), 'Element 3' );
    checkResult( cappedMap.get( 'key4' ), 'Element 4' );
    cappedMap.clear();
    checkResult( cappedMap.has( 'key2' ), false );
    checkResult( cappedMap.has( 'key3' ), false );
    checkResult( cappedMap.has( 'key4' ), false );
    cappedMap = new CappedMap( 2 );
    cappedMap.set( 'key1', 'Element 1' );
    cappedMap.set( 'key2', 'Element 2' );
    checkResult( cappedMap.get( 'key1' ), 'Element 1' );
    cappedMap.set( 'key3', 'Element 3' );
    checkResult( cappedMap.get( 'key2', 'not found' ), 'not found' );
    checkResult( cappedMap.get( 'key1' ), 'Element 1' );
    checkResult( cappedMap.get( 'key3' ), 'Element 3' );
    checkResult( cappedMap.has( 'key1' ), true );
    checkResult( cappedMap.has( 'key2' ), false );
    checkResult( cappedMap.has( 'key3' ), true );

    console.log( 'Testing : getQuotedText' );
    let quotedText = getQuotedText( JSON.stringify( { text: '\n\r\t' } ) );
    console.log( quotedText );
    checkResult( quotedText, '"{\\"text\\":\\"\\\\n\\\\r\\\\t\\"}"' );

    console.log( 'Testing : getDateTimeSuffix' );
    let universalDateTime = getUniversalDateTime();
    console.log( universalDateTime );
    let dateTimeSuffix = getDateTimeSuffix( universalDateTime );
    console.log( dateTimeSuffix );
    checkResultMatch( dateTimeSuffix, /^\d{20}$/ );

    console.log( 'Testing : getFilePath' );
    checkResult( getFilePath( '/folder/subfolder', 'file.txt' ), '/folder/subfolder/file.txt' );
    checkResult( getFilePath( '/folder/subfolder/', 'file.txt' ), '/folder/subfolder/file.txt' );
    checkResult( getFilePath( '/folder/subfolder', '.hiddenfile' ), '/folder/subfolder/.hiddenfile' );
    checkResult( getFilePath( '/folder/subfolder/', '' ), '/folder/subfolder/' );
    checkResult( getFilePath( '', 'file.txt' ), 'file.txt' );
    checkResult( getFilePath( '', '' ), '' );

    console.log( 'Testing : getFolderPath' );
    checkResult( getFolderPath( '/folder/subfolder/file.txt' ), '/folder/subfolder/' );
    checkResult( getFolderPath( '/folder/subfolder/' ), '/folder/subfolder/' );
    checkResult( getFolderPath( 'file.txt' ), '' );
    checkResult( getFolderPath( '' ), '' );

    console.log( 'Testing : getFileName' );
    checkResult( getFileName( '/folder/subfolder/file.txt' ), 'file.txt' );
    checkResult( getFileName( '/folder/subfolder/.hiddenfile' ), '.hiddenfile' );
    checkResult( getFileName( 'file.txt' ), 'file.txt' );
    checkResult( getFileName( '/folder/subfolder/' ), '' );
    checkResult( getFileName( '.hiddenfile' ), '.hiddenfile' );
    checkResult( getFileName( '' ), '' );

    console.log( 'Testing : getFileLabel' );
    checkResult( getFileLabel( 'file.txt' ), 'file' );
    checkResult( getFileLabel( 'archive.tar.gz' ), 'archive.tar' );
    checkResult( getFileLabel( 'noextensionfile' ), 'noextensionfile' );
    checkResult( getFileLabel( 'filewithdot.' ), 'filewithdot' );
    checkResult( getFileLabel( '.hiddenfile' ), '' );
    checkResult( getFileLabel( '' ), '' );

    console.log( 'Testing : getFileExtension' );
    checkResult( getFileExtension( 'file.txt' ), '.txt' );
    checkResult( getFileExtension( 'archive.tar.gz' ), '.gz' );
    checkResult( getFileExtension( 'noextensionfile' ), '' );
    checkResult( getFileExtension( 'filewithdot.' ), '.' );
    checkResult( getFileExtension( '.hiddenfile' ), '.hiddenfile' );
    checkResult( getFileExtension( '' ), '' );

    console.log( 'All tests passed!' );
}

// -- STATEMENTS

runTests();

