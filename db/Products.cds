namespace cap.ai.demo;

using {managed } from '@sap/cds/common';

entity Product : managed {
    key id    : UUID;
        name  : String(255);
        price : Decimal(10, 2);
        stock : Integer;
}
