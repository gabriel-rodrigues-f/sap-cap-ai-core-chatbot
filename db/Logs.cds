namespace cap.ai.demo;

using {
    cuid,
    managed
} from '@sap/cds/common';

entity Logs : cuid, managed {
    CONTENT : LargeString;
}
