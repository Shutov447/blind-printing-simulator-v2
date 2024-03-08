import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextForTypingComponent } from './text-for-typing.component';

describe('TextForTypingComponent', () => {
    let component: TextForTypingComponent;
    let fixture: ComponentFixture<TextForTypingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TextForTypingComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(TextForTypingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
