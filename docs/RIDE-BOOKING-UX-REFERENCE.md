# PLUITS Trans — Ride booking UX reference

Status: baseline reference for the first motorcycle booking test  
Date: 28 November 2026

## Purpose

Use the familiar ride-hailing booking sequence as a usability reference before developing PLUITS-specific interaction and visual changes. This is a flow/layout reference, not a copy of Grab's logo, assets, proprietary artwork, or source code. PLUITS brand identity remains authoritative.

## Baseline passenger flow

1. Open the Motor/Ride service from the service hub.
2. Show the map as the primary context.
3. Enter or confirm pickup and destination in a compact map-bottom sheet.
4. Confirm exact pickup and destination pins.
5. Continue to available motorcycle ride options.
6. Show estimated fare and estimated time before booking.
7. Let the passenger choose driver preference (woman/man) when eligible and available.
8. Confirm the request using a clear Pesan Motor action.
9. Show search, driver assigned, driver approaching, arrived, and trip progress states.
10. Keep cancel/back paths clear and preserve selected route when returning to booking.

## PLUITS requirements layered onto the reference

- The passenger can later choose Temukan driver sendiri / PLUITS Direct and present a short-lived QR request to a nearby driver.
- QR matching, official fare, driver verification, and trip records must be integrated into the same ride flow; do not create a disconnected booking experience.
- Fare is calculated by PLUITS rules and shown before confirmation. The current frontend fare is a prototype estimate only.
- Driver preference must be handled respectfully, with availability and eligibility communicated clearly. Do not imply a driver gender is guaranteed until a real dispatch backend confirms it.
- Keep the current map/location/routing implementation and service navigation intact while refining the booking UI.

## Naming and localization

- Service identifiers and product names use English: Ride, Car, Food, Courier, Ticket, Travel.
- User-facing descriptions and actions are localized, not duplicated bilingually.
- Default locale for the first Indonesia test is Bahasa Indonesia (id).
- English (en) is the next locale. Language selection should affect labels, helper text, errors, accessibility labels, and date/currency formatting consistently.
- Do not hard-code English service names as Indonesian translations; keep service identifiers separate from translated display labels.

## Current implementation boundary

This repository is a static GitHub Pages frontend prototype. Search, driver assignment, and trip progression remain simulated. No real driver dispatch, account, payment, or production fare service is connected yet.
