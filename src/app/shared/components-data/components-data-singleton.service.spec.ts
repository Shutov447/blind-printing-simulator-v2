import { TestBed } from '@angular/core/testing';

import { ComponentsDataSingletonService } from './components-data-singleton.service';

describe('ComponentsDataSingletonService', () => {
    let service: ComponentsDataSingletonService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ComponentsDataSingletonService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
