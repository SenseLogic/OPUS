// -- CONSTANTS

export const
    isBrowser = ( typeof window !== 'undefined' && typeof window.document !== 'undefined' ),
    nullTuid = 'AAAAAAAAAAAAAAAAAAAAAA',
    nullUuid = '00000000-0000-0000-0000-000000000000',
    nullDate = {
        year : 1000,
        month : 1,
        day : 1
        },
    nullTime = {
        hour : 0,
        minute : 0,
        second : 0,
        millisecond : 0,
        microsecond : 0
        },
    nullDateTime = {
        year : 1000,
        month : 1,
        day : 1,
        hour : 0,
        minute : 0,
        second : 0,
        millisecond : 0,
        microsecond : 0
        },
    minimumInteger = -9007199254740991,
    maximumInteger = 9007199254740991,
    halfPi = Math.PI * 0.5,
    pi = Math.PI,
    twoPi = Math.PI * 2,
    degreesToRadians = Math.PI / 180,
    radiansToDegrees = 180 / Math.PI,
    naturalExpression = /^[0-9][0-9]*$/,
    integerExpression = /^-?[0-9][0-9]*$/,
    realExpression = /^-?[0-9][0-9]*\.[0-9]*$/,
    numericExpression = /^-?[0-9][0-9]*\.?[0-9]*$/,
    slugExpression = /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    valueExpression = /^(.*?)([<=>]+)(.*)$/,
    invalidCharacterExpression = /[^\p{L}\p{N}\-_.]/gu;

// -- TYPES

export class CappedMap
{
    // -- CONSTRUCTORS

    constructor(
        maximumElementCount
        )
    {
        this.maximumElementCount = maximumElementCount;
        this.elementByKeyMap = new Map();
    }

    // -- INQUIRIES

    has(
        key
        )
    {
        return this.elementByKeyMap.has( key );
    }

    // -- OPERATIONS

    clear(
        )
    {
        this.elementByKeyMap.clear();
    }

    // ~~

    set(
        key,
        element
        )
    {
        if ( this.elementByKeyMap.has( key ) )
        {
            this.elementByKeyMap.delete( key );
        }
        else if ( this.elementByKeyMap.size >= this.maximumElementCount )
        {
            let oldestKey = this.elementByKeyMap.keys().next().value;
            this.elementByKeyMap.delete( oldestKey );
        }

        this.elementByKeyMap.set( key, element );
    }

    // ~~

    get(
        key,
        defaultValue = undefined
        )
    {
        if ( !this.elementByKeyMap.has( key ) )
        {
            return defaultValue;
        }
        else
        {
            let element = this.elementByKeyMap.get( key );

            this.elementByKeyMap.delete( key );
            this.elementByKeyMap.set( key, element );

            return element;
        }
    }
}

// -- FUNCTIONS

export const
    raw = String.raw,
    log = console.log,
    logObject = console.dir,
    logTable = console.table,
    logStack = console.trace,
    isNaN = Number.isNaN,
    isInteger = Number.isInteger,
    getReal = parseFloat,
    getInteger = parseInt,
    getNumber = Number,
    getMinimumReal = Math.min,
    getMaximumReal = Math.max,
    getPositiveReal = Math.abs,
    getSign = Math.sign,
    getFloorInteger = Math.floor,
    getCeilInteger = Math.ceil,
    getRoundInteger = Math.round,
    getSquareRoot = Math.sqrt,
    getHypotenuse = Math.hypot,
    getPower = Math.pow,
    getExponential = Math.exp,
    getLogarithm = Math.log,
    getLogarithm10 = Math.log10,
    getCosinus = Math.cos,
    getSinus = Math.sin,
    getTangent = Math.tan,
    getArcCosinus = Math.acos,
    getArcSinus = Math.asin,
    getArcTangent = Math.atan,
    getArcTangent2 = Math.atan2,
    getRandom = Math.random,
    getText = String,
    getEscapedText = escape,
    getUnescapedText = unescape,
    getEncodedUri = encodeURI,
    getDecodedUri = decodeURI,
    getJsonText = JSON.stringify,
    getJsonObject = JSON.parse;

// ~~

export function logValue(
    value
    )
{
    console.log( getJsonText( value ) );
}

// ~~

export function logWarning(
    warning
    )
{
    console.trace();
    console.warn( warning );
}

// ~~

export function logError(
    error
    )
{
    console.trace();
    console.error( error );
}

// ~~

export function getClampValue(
    value,
    minimumValue,
    maximumValue
    )
{
    if ( value < minimumValue )
    {
        return minimumValue;
    }
    else if ( value > maximumValue )
    {
        return maximumValue;
    }
    else
    {
        return value;
    }
}

// ~~

export function getRadianAngle(
    degreeAngle
    )
{
    return degreeAngle * degreesToRadians;
}

// ~~

export function getDegreeAngle(
    radianAngle
    )
{
    return radianAngle * radiansToDegrees;
}

// ~~

export function getRandomReal(
    firstReal,
    postReal
    )
{
    return firstReal + getRandom() * ( postReal - firstReal );
}

// ~~

export function getRandomInteger(
    firstInteger,
    lastInteger
    )
{
    return getFloorInteger( firstInteger + getRandom() * ( lastInteger - firstInteger + 1 ) );
}

// ~~

export function isBooleanText(
    text
    )
{
    return text === 'false' || text === 'true';
}

// ~~

export function isBinaryText(
    text
    )
{
    return text === '0' || text === '1';
}

// ~~

export function isNaturalText(
    text
    )
{
    return text.match( naturalExpression );
}

// ~~

export function isIntegerText(
    text
    )
{
    return text.match( integerExpression );
}

// ~~

export function isRealText(
    text
    )
{
    return text.match( realExpression );
}

// ~~

export function isNumericText(
    text
    )
{
    return text.match( numericExpression );
}

// ~~

export function isSlugText(
    text
    )
{
    return text.match( slugExpression );
}

// ~~

export function isBoolean(
    value
    )
{
    return typeof value === 'boolean';
}

// ~~

export function isNatural(
    value
    )
{
    return isInteger( value ) && getInteger( value ) >= 0;
}

// ~~

export function isNumber(
    value
    )
{
    return typeof value === 'number';
}

// ~~

export function isString(
    value
    )
{
    return typeof value === 'string';
}

// ~~

export function isObject(
    value
    )
{
    return (
        value !== null
        && typeof value === 'object'
        && !Array.isArray( value )
        );
}

// ~~

export function isArray(
    value
    )
{
    return value instanceof Array;
}

// ~~

export function isFunction(
    value
    )
{
    return value instanceof Function;
}

// ~~

export function isElement(
    value
    )
{
    return value instanceof HTMLElement;
}

// ~~

export function getMapById(
    elementArray,
    default_value = null
    )
{
    if ( elementArray )
    {
        let elementMap = {};

        for ( let element of elementArray )
        {
            elementMap[ element.id ] = element;
        }

        return elementMap;
    }
    else
    {
        return default_value;
    }
}

// ~~

export function getMap(
    elementArray,
    keyName = 'id',
    default_value = null
    )
{
    if ( elementArray )
    {
        let elementMap = {};

        for ( let element of elementArray )
        {
            elementMap[ element[ keyName ] ] = element;
        }

        return elementMap;
    }
    else
    {
        return default_value;
    }
}

// ~~

export function getIntegerComparison(
    firstInteger,
    secondInteger
    )
{
    return firstInteger - secondInteger;
}

// ~~

export function getRealComparison(
    firstReal,
    secondReal
    )
{
    return firstReal - secondReal;
}

// ~~

export function getTextComparison(
    firstText,
    secondText
    )
{
    if ( firstText < secondText )
    {
        return -1;
    }
    else if ( firstText > secondText )
    {
        return 1;
    }
    else
    {
        return 0;
    }
}

// ~~

export function getNaturalTextComparison(
    firstText,
    secondText
    )
{
    return firstText.localeCompare( secondText, undefined, { numeric : true } );
}

// ~~

export function removePrefix(
    text,
    prefix
    )
{
    if ( prefix !== ''
         && text.startsWith( prefix ) )
    {
        return text.slice( prefix.length );
    }
    else
    {
        return text;
    }
}

// ~~

export function removeSuffix(
    text,
    suffix
    )
{
    if ( suffix !== ''
         && text.endsWith( suffix ) )
    {
        return text.slice( 0, text.length - suffix.length );
    }
    else
    {
        return text;
    }
}

// ~~

export function replacePrefix(
    text,
    oldPrefix,
    newPrefix
    )
{
    if ( text.startsWith( oldPrefix ) )
    {
        return newPrefix + text.slice( oldPrefix.length );
    }
    else
    {
        return text;
    }
}

// ~~

export function replaceSuffix(
    text,
    oldSuffix,
    newSuffix
    )
{
    if ( text.endsWith( oldSuffix ) )
    {
        return text.slice( 0, text.length - oldSuffix.length ) + newSuffix;
    }
    else
    {
        return text;
    }
}

// ~~

export function replaceIteratively(
    text,
    oldText,
    newText
    )
{
    let replacedText = text;

    do
    {
        var oldReplacedText = replacedText;

        replacedText = replacedText.replaceAll( oldText, newText );
    }
    while ( replacedText !== oldReplacedText );

    return oldReplacedText;
}

// ~~

export function getLeftPaddedText(
    text,
    minimumCharacterCount,
    paddingCharacter = ' '
    )
{
    if ( text.length < minimumCharacterCount )
    {
        return paddingCharacter.repeat( minimumCharacterCount - text.length ) + text;
    }
    else
    {
        return text;
    }
}

// ~~

export function getRightPaddedText(
    text,
    minimumCharacterCount,
    paddingCharacter = ' '
    )
{
    if ( text.length < minimumCharacterCount )
    {
        return text + paddingCharacter.repeat( minimumCharacterCount - text.length );
    }
    else
    {
        return text;
    }
}

// ~~

export function getQuotedText(
    value
    )
{
    return (
        '"'
        + value.toString()
              .replaceAll( '\\', '\\\\' )
              .replaceAll( '\n', '\\n' )
              .replaceAll( '\r', '\\r' )
              .replaceAll( '\t', '\\t' )
              .replaceAll( '"', '\\"' )
              .replaceAll( '\'', '\\\'' )
        + '"'
        );
}

// ~~

export function getRealText(
    real,
    minimumDecimalCount,
    maximumDecimalCount
    )
{
    let multiplier = Math.pow( 10, maximumDecimalCount );
    real = Math.round( real * multiplier ) / multiplier;

    let realText = real.toFixed( maximumDecimalCount );

    while ( realText.includes( '.' )
            && ( realText.endsWith( '0' )
                 || realText.endsWith( '.' ) ) )
    {
        realText = realText.slice( 0, -1 );
    }

    return realText;
}

// ~~

export function getHexadecimalTextFromInteger(
    integer
    )
{
    return parseInt( integer ).toString( 16 );
}


// ~~

export function getCurrentMillisecondCount(
    )
{
    if ( isBrowser )
    {
        return window.performance.timing.navigationStart + window.performance.now();
    }
    else
    {
        let hrTime = process.hrtime();

        return parseInt( hrTime[ 0 ] * 1000 + hrTime[ 1 ] / 1000000 );
    }
}

// ~~

export function getCurrentLocalDateTime(
    )
{
    return new Date();
}

// ~~

export function getCurrentUniversalDateTime(
    )
{
    let currentLocalDateTime = new Date();

    return new Date(
        Date.UTC(
            currentLocalDateTime.getUTCFullYear(),
            currentLocalDateTime.getUTCMonth(),
            currentLocalDateTime.getUTCDate(),
            currentLocalDateTime.getUTCHours(),
            currentLocalDateTime.getUTCMinutes(),
            currentLocalDateTime.getUTCSeconds(),
            currentLocalDateTime.getUTCMilliseconds()
            )
        );
}

// ~~

export function getSystemDate(
    systemDate
    )
{
    if ( systemDate === undefined )
    {
        return new Date();
    }
    else if ( isString( systemDate ) )
    {
        return new Date( systemDate );
    }
    else
    {
        return systemDate;
    }
}

// ~~

export function getLocalDate(
    systemDate
    )
{
    systemDate = getSystemDate( systemDate );

    return {
        year : systemDate.getFullYear(),
        month : systemDate.getMonth() + 1,
        day : systemDate.getDate()
        };
}

// ~~

export function getLocalTime(
    systemDate
    )
{
    systemDate = getSystemDate( systemDate );

    return {
        hour : systemDate.getHours(),
        minute : systemDate.getMinutes(),
        second : systemDate.getSeconds(),
        millisecond : systemDate.getMilliseconds(),
        microsecond : 0
        };
}

// ~~

export function getLocalDateTime(
    systemDate
    )
{
    systemDate = getSystemDate( systemDate );

    return {
        year : systemDate.getFullYear(),
        month : systemDate.getMonth() + 1,
        day : systemDate.getDate(),
        hour : systemDate.getHours(),
        minute : systemDate.getMinutes(),
        second : systemDate.getSeconds(),
        millisecond : systemDate.getMilliseconds(),
        microsecond : 0
        };
}

// ~~

export function getUniversalDate(
    systemDate
    )
{
    systemDate = getSystemDate( systemDate );

    return {
        year : systemDate.getUTCFullYear(),
        month : systemDate.getUTCMonth() + 1,
        day : systemDate.getUTCDate()
        };
}

// ~~

export function getUniversalTime(
    systemDate
    )
{
    systemDate = getSystemDate( systemDate );

    return {
        hour : systemDate.getUTCHours(),
        minute : systemDate.getUTCMinutes(),
        second : systemDate.getUTCSeconds(),
        millisecond : systemDate.getUTCMilliseconds(),
        microsecond : 0
        };
}

// ~~

export function getUniversalDateTime(
    systemDate
    )
{
    systemDate = getSystemDate( systemDate );

    return {
        year : systemDate.getUTCFullYear(),
        month : systemDate.getUTCMonth() + 1,
        day : systemDate.getUTCDate(),
        hour : systemDate.getUTCHours(),
        minute : systemDate.getUTCMinutes(),
        second : systemDate.getUTCSeconds(),
        millisecond : systemDate.getUTCMilliseconds(),
        microsecond : 0
        };
}

// ~~

export function getSubsecondTimeText(
    dateTime
    )
{
    if ( dateTime.millisecond !== 0
         || dateTime.microsecond !== 0 )
    {
        if ( dateTime.microsecond !== 0 )
        {
            return (
                '.'
                + getLeftPaddedText( dateTime.millisecond.toString(), 3, '0' )
                + getLeftPaddedText( dateTime.microsecond.toString(), 3, '0' )
                );
        }
        else
        {
            return (
                '.'
                + getLeftPaddedText( dateTime.millisecond.toString(), 3, '0' )
                );
        }
    }
    else
    {
        return '';
    }
}

// ~~

export function getDateText(
    date,
    infix = ':',
    suffix = ''
    )
{
    return (
        getLeftPaddedText( date.year.toString(), 4, '0' )
        + infix
        + getLeftPaddedText( date.month.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( date.day.toString(), 2, '0' )
        + suffix
        );
}

// ~~

export function getTimeText(
    time,
    infix = '-',
    suffix = ''
    )
{
    return (
        getLeftPaddedText( time.hour.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( time.minute.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( time.second.toString(), 2, '0' )
        + suffix
        );
}

// ~~

export function getDateTimeText(
    dateTime,
    dateInfix = '-',
    infix = ' ',
    timeInfix = ':',
    suffix = ''
    )
{
    return (
        getLeftPaddedText( dateTime.year.toString(), 4, '0' )
        + dateInfix
        + getLeftPaddedText( dateTime.month.toString(), 2, '0' )
        + dateInfix
        + getLeftPaddedText( dateTime.day.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.hour.toString(), 2, '0' )
        + timeInfix
        + getLeftPaddedText( dateTime.minute.toString(), 2, '0' )
        + timeInfix
        + getLeftPaddedText( dateTime.second.toString(), 2, '0' )
        + getSubsecondTimeText( dateTime )
        + suffix
        );
}

// ~~

export function getDateTimeSuffix(
    dateTime,
    infix = '',
    suffix = ''
    )
{
    return (
        getLeftPaddedText( dateTime.year.toString(), 4, '0' )
        + infix
        + getLeftPaddedText( dateTime.month.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.day.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.hour.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.minute.toString(), 2, '0' )
        + infix
        + getLeftPaddedText( dateTime.second.toString(), 2, '0' )
        + getLeftPaddedText( dateTime.millisecond.toString(), 3, '0' )
        + getLeftPaddedText( dateTime.microsecond.toString(), 3, '0' )
        + suffix
        );
}

// ~~

export function getLogicalFilePath(
    filePath
    )
{
    return filePath.replaceAll( '\\', '/' );
}

// ~~

export function getFilePath(
    folderPath,
    filePath
    )
{
    if ( folderPath === '' )
    {
        return filePath;
    }
    else if ( folderPath.endsWith( '/' ) )
    {
        return folderPath + filePath;
    }
    else
    {
        return folderPath + '/' + filePath;
    }
}

// ~~

export function getFolderPath(
    filePath
    )
{
    return filePath.slice( 0, filePath.lastIndexOf( '/' ) + 1 );
}

// ~~

export function getFileName(
    filePath
    )
{
    return filePath.slice( filePath.lastIndexOf( '/' ) + 1 );
}

// ~~

export function getValidFileName(
    fileName
    )
{
    return replaceIteratively( fileName.replace( invalidCharacterExpression, '_' ), '__', '_' );
}

// ~~

export function getFileLabel(
    filePath
    )
{
    let fileName = getFileName( filePath );
    let lastDotCharacterIndex = fileName.lastIndexOf( '.' );

    if ( lastDotCharacterIndex >= 0 )
    {
        return fileName.slice( 0, lastDotCharacterIndex );
    }
    else
    {
        return fileName;
    }
}

// ~~

export function getFileExtension(
    filePath
    )
{
    let fileName = getFileName( filePath );
    let lastDotCharacterIndex = fileName.lastIndexOf( '.' );

    if ( lastDotCharacterIndex >= 0 )
    {
        return fileName.slice( lastDotCharacterIndex );
    }
    else
    {
        return '';
    }
}

// ~~

export function addFileExtensionPrefix(
    filePath,
    fileExtensionPrefix
    )
{
    let lastSlashCharacterIndex = filePath.lastIndexOf( '/' );
    let lastDotCharacterIndex = filePath.lastIndexOf( '.' );

    if ( lastDotCharacterIndex >= 0
         && lastDotCharacterIndex > lastSlashCharacterIndex )
    {
        return filePath.slice( 0, lastDotCharacterIndex ) + fileExtensionPrefix + filePath.slice( lastDotCharacterIndex );
    }
    else
    {
        return filePath + fileExtensionPrefix;
    }
}

// ~~

export function isSearchBot(
    userAgentText
    )
{
    let searchBotNameArray =
        [
            'googlebot',
            'bingbot',
            'slurp',
            'duckduckbot',
            'baiduspider',
            'yandexbot',
            'facebookexternalhit',
            'twitterbot',
            'rogerbot',
            'linkedinbot',
            'embedly',
            'quora link preview',
            'showyoubot',
            'outbrain',
            'pinterest',
            'slackbot'
        ];

    userAgentText = userAgentText.toLowerCase();

    for ( let searchBotName of searchBotNameArray )
    {
        if ( userAgentText.indexOf( searchBotName ) >= 0 )
        {
            return true;
        }
    }

    return false;
}

// ~~

export function addClass(
    element,
    className
    )
{
    element.classList.add( className );

    return element;
}

// ~~

export function removeClass(
    element,
    className
    )
{
    element.classList.remove( className );

    return element;
}

// ~~

export function toggleClass(
    element,
    className,
    condition = undefined
    )
{
    if ( condition === undefined )
    {
        if ( element.classList.contains( className ) )
        {
            element.classList.remove( className );
        }
        else
        {
            element.classList.add( className );
        }
    }
    else if ( condition )
    {
        element.classList.add( className );
    }
    else
    {
        element.classList.remove( className );
    }

    return element;
}
