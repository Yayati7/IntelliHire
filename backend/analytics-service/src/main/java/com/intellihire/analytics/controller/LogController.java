package com.intellihire.analytics.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@RestController
public class LogController {

    @Value("${logging.file.name}")
    private String logFilePath;

    @GetMapping("/logs")
    public Map<String, Object> getLogs(@RequestParam(defaultValue = "300") int lines) {

        Path path = Path.of(logFilePath);

        if (!Files.exists(path)) {
            return Map.of("lines", List.of(), "totalLines", 0);
        }

        try {

            List<String> allLines = Files.readAllLines(path);
            int from = Math.max(0, allLines.size() - lines);
            List<String> tail = allLines.subList(from, allLines.size());

            return Map.of("lines", tail, "totalLines", allLines.size());

        } catch (IOException e) {

            return Map.of("lines", List.of("Unable to read log file: " + e.getMessage()), "totalLines", 0);

        }

    }

}